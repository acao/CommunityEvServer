import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Schema as CommunityEventsSchema } from '../';
import { graphql } from 'graphql';
import { session } from './testHelpers';
// 80+ char lines are useful in describe/it, so ignore in this file.
/*eslint-disable max-len */

describe('User connections', () => {

  it('Signs up a user', async () => {
    var mutation = `
      mutation AddUser($username: String!, $password: Password!) {
         signup(username: $username, password: $password){
            username
         }
      }
    `;
    var params = {
      "username": "Bob1992",
      "password": "Bob"
    };
    var expected = {
      "signup": {
          "username": "Bob1992",
      },
    };
    graphql(CommunityEventsSchema, mutation, { session }, params).then(result => {
      expect(result).to.deep.equal({data: expected});
    });
  });
  it('Lists users', async () => {
    var query = `
      query ListUsers {
        users{
          username
        }
      }
    `;
    var expected = {
      "users": [
        {
          "username": "Bob1992",
        }
      ],
    };
    graphql(CommunityEventsSchema, query, { session }).then(result => {
      expect(result).to.deep.equal({data: expected});
    });
  });
});
