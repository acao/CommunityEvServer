import {
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import {
  GraphQLDateTime,
} from 'graphql-custom-types';

import Subscriptions from '../lib/subscriptions';

const subscriptions = new Subscriptions();

export const SubscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  description: 'A subscription.',
  fields: () => ({
    id: {
      description: 'The subscription id.',
      type: GraphQLInt
    },
    subscribedId: {
      description: 'OG ID of the subscribed object',
      type: GraphQLString,
    },
    subscribedType: {
      description: 'The subscribed object type. OG. Page, User or Event',
      type: GraphQLString,
    },
    ownerId: {
      description: 'The subscription owner.',
      type: GraphQLInt,
    },
    createdAt: {
      description: 'Time of user creation.',
      type: GraphQLDateTime,
    },
    updatedAt: {
      description: 'Time of last user update.',
      type: GraphQLDateTime,
    },
  }),
});

export const ListSubscriptions = {
  description: 'List bookmarks with filter',
  type: SubscriptionType,
  args: {
    ownerId: {
      description: 'ID of the bookmark to retrieve.',
      type: GraphQLString,
    },
    subscribedId: {
      description: 'ID of the bookmarked item',
      type: GraphQLString,
    }
  },
  resolve(root, filterObj) {
    return subscriptions.getAll(filterObj);

  }
};

export const getSubscriptionById = {
  description: 'Get a subscription by id.',
  type: SubscriptionType,
  args: {
    id: {
      description: 'ID of the subscription to retrieve.',
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: (root, {id}) => subscriptions.getById(id)
};

export const addSubscription = {
  description: 'Add a subscription',
  type: SubscriptionType,
  args: {
    subscribedId: {
      description: 'ID of the subscriptioned item',
      type: new GraphQLNonNull(GraphQLString),
    },
    subscribedType: {
      description: 'The subscription type. Page or Event.',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(parentValue, _, { rootValue: { session } }) {
    return subscriptions.create(_.subscribedId, _.subscribedType);
  }
}
