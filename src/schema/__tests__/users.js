import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Schema as CommunityEventsSchema } from '../';
import { graphql } from 'graphql';
import { session, exampleUser } from './testHelpers';
// 80+ char lines are useful in describe/it, so ignore in this file.
/*eslint-disable max-len */

describe('User mutations', () => {

  it('Signs up a user', async () => {
    var mutation = `
      mutation AddUser($username: String!, $password: Password!) {
         signup(username: $username, password: $password){
            username
         }
      }
    `;
    var params = defaultUser;
    var expected = {
      "signup": {
          "username": defaultUser.username
      },
    };
    graphql(CommunityEventsSchema, mutation, { session }, params).then(result => {
      expect(result).to.deep.equal({data: expected});
    });
  });

  it('Logs in a user', async () => {
    var mutation = `
      mutation LoginUser($username: String!, $password: Password2) {
         login(username: $username, password: $password){
            username
         }
      }
    `;
    var params = defaultUser;
    var expected = {
      "login": {
          "username": defaultUser.username,
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
          "username": defaultUser.username,
        }
      ],
    };
    graphql(CommunityEventsSchema, query, { session }).then(result => {
      expect(result).to.deep.equal({data: expected});
    });
  });
  // Requires auth
  // it('Update email', async () => {
  //     var param = { mail: 'bob@bob.com'}
  //     var query = `
  //       mutation SetEmail($mail: String!) {
  //         updateEmail(mail: $mail){
  //           mail
  //         }
  //       }
  //     `;
  //     var expected = {
  //       "updateEmail": param
  //     };
  //     graphql(CommunityEventsSchema, query, { session }, param).then(result => {
  //         expect(result).to.deep.equal({data: expected});
  //     });
  //   });
});

// describe('User connections', () => {
//
//   });
//   // it('Gets self', async () => {
//   //   var query = `
//   //     query GetSelf {
//   //       self{
//   //         username
//   //       }
//   //     }
//   //   `;
//   //   var expected = {
//   //     "self": {
//   //         "username": "Bob1992",
//   //       }
//   //   };
//   //   graphql(CommunityEventsSchema, query, { session }).then(result => {
//   //     expect(result).to.deep.equal({data: expected});
//   //   });
//   // });
// });
