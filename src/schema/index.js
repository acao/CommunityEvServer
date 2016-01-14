import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import {
  getBookmarkById,
  addBookmark,
  deleteBookmark,
  listBookmarks,
} from './bookmarks';
import {
  getSubscriptionById,
  addSubscription,
} from './subscriptions';
import {
  self,
  user,
  login,
  signup,
  listUsers,
  updateEmail,
} from './users';

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root for query operations.',
  fields: () => ({
    getBookmark: getBookmarkById,
    getSubscription: getSubscriptionById,
    self,
    users: listUsers,
    bookmarks: listBookmarks
  })
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root for mutation operations.',
  fields: () => ({
    login,
    signup,
    updateEmail,
    addBookmark,
    deleteBookmark,
    addSubscription
  })
});

export const Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
