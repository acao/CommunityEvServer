import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} from 'graphql';
import {
  GraphQLEmail,
  GraphQLPassword,
  GraphQLDateTime,
} from 'graphql-custom-types';
import { GraphQLError } from 'graphql/error';
import Users from '../lib/users';
import { BookmarkType } from './bookmarks';
import { SubscriptionType } from './subscriptions';
const users = new Users();

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Representation of public user data.',
  fields: () => ({
    _id: {
      description: 'Unique user id.',
      type: GraphQLID,
    },
    username: {
      description: 'Unique username.',
      type: GraphQLString,
    },
    createdAt: {
      description: 'Time of user creation.',
      type: GraphQLDateTime,
    },
    updatedAt: {
      description: 'Time of last user update.',
      type: GraphQLDateTime,
    },
    mail: {
      description: 'Optional E-Mail address.',
      type: GraphQLEmail,
    },
    bookmarks: {
      description: 'A list of bookmarks.',
      type: new GraphQLList(BookmarkType),
    },
    subscriptions: {
      description: 'A list of subscriptions.',
      type: new GraphQLList(SubscriptionType),
    },
  })
});

export const self = {
  description: 'Information about the currently logged in user.',
  type: UserType,
  resolve(parentValue, _, { rootValue: { session } }) {
    if(session.passport) {
      return session.passport.user;
    }
    throw new GraphQLError('Query error: Not logged in');
  }
};

export const listUsers = {
  description: 'Information about all users.',
  type: new GraphQLList(UserType),
  resolve(parentValue, _, { rootValue: { session } }) {
    return users.getList();
  }
};

export const updateEmail = {
  description: 'Update mail address of the currently logged in user.',
  type: UserType,
  args: {
    mail: {
      description: 'Non empty, valid E-Mail address.',
      type: GraphQLEmail
    }
  },
  resolve(parentValue, _, { rootValue: { session } }) {
    if(session.passport) {
      return users.updateMail(session.passport.user._id, _.mail);
    }
    throw new GraphQLError('Query error: Not logged in');
  }
}

export const signup = {
  description: 'Register a new user account. Returns newly created user or null if username is taken.',
  type: UserType,
  args: {
    username: {
      description: 'Username for new account.',
      type: GraphQLString
    },
    password: {
      description: 'Password for new account.',
      type: new GraphQLPassword(6)
    }
  },
  resolve(parentValue, _, { rootValue: { session } }) {
    return users.signup(_.username, _.password);
  }
}
export const login = {
  description: 'Login to a user account. Returns newly created user or null if username is taken.',
  type: UserType,
  args: {
    username: {
      description: 'Username for account.',
      type: GraphQLString
    },
    password: {
      description: 'Password for account account.',
      type: new GraphQLPassword(6)
    }
  },
  resolve(parentValue, _, { rootValue: { data } }) {
    return users.login(_.username, _.password);
  }
}
