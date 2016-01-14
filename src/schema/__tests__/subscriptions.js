import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Schema as CommunityEventsSchema } from '../';
import { graphql } from 'graphql';
import { session } from './testHelpers';
// 80+ char lines are useful in describe/it, so ignore in this file.
/*eslint-disable max-len */
const exampleSubscription = {
  "subscribedId": "12345234324343",
  "subscribedType": "Event"
}

describe('Subscription fields', () => {
  it('Creates a subscription', async () => {
    var mutation = `
      mutation CreateSubscription($subscribedId: String!, $subscribedType: String!) {
       addSubscription(subscribedId: $subscribedId, subscribedType: $subscribedType){
        subscribedId,
        subscribedType
       }
      }
    `;
    var params = exampleSubscription;
    var expected = {
      "addSubscription": exampleSubscription
    };
    graphql(CommunityEventsSchema, mutation, { session }, params).then(result => {
      console.log(result);
      expect(result).to.deep.equal({data: expected});
    });
  });
  // it('List subscriptions', async () => {
  //   var query = `
  //     query ListSubscriptions {
  //      subscriptions{
  //        subscribedId,
  //        subscribedType
  //      }
  //     }
  //   `;
  //   var params = exampleSubscription;
  //   var expected = {subscriptions: [exampleSubscription]};
  //
  //   graphql(CommunityEventsSchema, query, { session }).then(result => {
  //     expect(result).to.deep.equal({data: expected});
  //   });
  // });

});
