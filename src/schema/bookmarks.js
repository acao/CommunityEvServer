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

import Bookmarks from '../lib/bookmarks';

const bookmarks = new Bookmarks();

const bookmarkType = new GraphQLObjectType({
  name: 'Bookmark',
  description: 'A bookmark.',
  fields: () => ({
    id: {
      description: 'The bookmark id.',
      type: GraphQLInt,
    },
    bookmarkedId: {
      description: 'OG ID of the bookmarked item',
      type: GraphQLString,
    },
    bookmarkedType: {
      description: 'The bookmark type. Page or Event.',
      type: GraphQLString,
    },
    ownerId: {
      description: 'The bookmark owner.',
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

export const BookmarkType = bookmarkType;

export const listBookmarks = {
  description: 'List bookmarks with filter',
  type: bookmarkType,
  args: {
    ownerId: {
      description: 'ID of the bookmark to retrieve.',
      type: GraphQLInt,
    },
    bookmarkedId: {
      description: 'ID of the bookmarked item',
      type: GraphQLInt,
    }
  },
  resolve(root, filterObj) {
    return bookmarks.getAll(filterObj);
  }
};

export const getBookmarkById = {
  description: 'Get a bookmark by id.',
  type: bookmarkType,
  args: {
    id: {
      description: 'ID of the bookmark to retrieve.',
      type: new GraphQLNonNull(GraphQLInt),
    }
  },
  resolve(root, {id}) {
    return bookmarks.getById(id);
  }
};


export const addBookmark = {
  description: 'Add a bookmark',
  type: bookmarkType,
  args: {
    bookmarkedId: {
      description: 'ID of the bookmarked item',
      type: GraphQLString,
    },
    bookmarkedType: {
      description: 'The bookmark type. Page or Event.',
      type: GraphQLString,
    },
  },
  resolve(parentValue, _, { rootValue: { session } }) {
    return bookmarks.create(_.bookmarkedId, _.bookmarkedType);
  }
}
export const deleteBookmark = {
  description: 'Remove a bookmark',
  type: bookmarkType,
  args: {
    id: {
      description: 'Bookmark ID',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve(parentValue, _, { rootValue: { session } }) {
    return bookmarks.remove({_id: _.id});
  }
}
