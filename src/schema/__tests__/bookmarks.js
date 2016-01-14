import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Schema as CommunityEventsSchema } from '../';
import { graphql } from 'graphql';
import { session } from './testHelpers';
// 80+ char lines are useful in describe/it, so ignore in this file.
/*eslint-disable max-len */
const exampleBookmark = {
  "bookmarkedId": "12345234324343",
  "bookmarkedType": "Event"
}

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
    var params = exampleBookmark;
    var expected = {bookmarks: [exampleBookmark]};

    graphql(CommunityEventsSchema, query, { session }).then(result => {
      expect(result).to.deep.equal({data: expected});
    });
  });
});
