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

const subscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  description: 'A subscription.',
  fields: () => ({
    id: {
      description: 'The subscription id.',
      type: GraphQLInt
    },
    subscribedId: {
      description: 'OG ID of the subscribed object',
      type: GraphQLInt,
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

export const SubscriptionType = subscriptionType;

const getById = {
  description: 'Get a subscription by id.',
  type: subscriptionType,
  args: {
    id: {
      description: 'ID of the subscription to retrieve.',
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: (root, {id}) => subscriptions.getById(id)
};

export const getSubscriptionById = getById;
