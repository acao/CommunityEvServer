import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Schema as CommunityEventsSchema } from '../';
import { graphql } from 'graphql';
import { session, exampleBookmark } from './testHelpers';
// 80+ char lines are useful in describe/it, so ignore in this file.
/*eslint-disable max-len */

describe('Bookmark fields', () => {
  it('Creates a bookmark', async () => {
    var mutation = `
      mutation CreateBookmark($bookmarkedId: String!, $bookmarkedType: String!) {
       addBookmark(bookmarkedId: $bookmarkedId, bookmarkedType: $bookmarkedType){
        bookmarkedId,
        bookmarkedType
       }
      }
    `;
    var params = exampleBookmark;
    var expected = {
      "addBookmark": exampleBookmark
    };
    graphql(CommunityEventsSchema, mutation, { session }, params).then(result => {
      console.log(result);
      expect(result).to.deep.equal({data: expected});
    });
  });
  it('List bookmarks', async () => {
    var query = `
      query ListBookmarks {
       bookmarks{
         bookmarkedId,
         bookmarkedType
       }
      }
    `;
    var expected = {bookmarks: [exampleBookmark]};

    graphql(CommunityEventsSchema, query, { session }).then(result => {
      expect(result).to.deep.equal({data: expected});
    });
  });
  // it('List bookmarks by owner', async () => {
  //   var query = `
  //     query ListBookmarks($ownerId: Int!) {
  //      bookmarks(ownerId: $ownerId){
  //        bookmarkedId,
  //        bookmarkedType
  //      }
  //     }
  //   `;
  //   var params = exampleUser;
  //   var expected = {bookmarks: [exampleBookmark]};
  //
  //   graphql(CommunityEventsSchema, query, { session }, params).then(result => {
  //     expect(result).to.deep.equal({data: expected});
  //   });
  // });
});
