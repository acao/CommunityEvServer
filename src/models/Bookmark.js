import mongoose from 'mongoose';
import User from './User';
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
  updatedAt: { type: Date },
  bookmarkedId: Schema.Types.ObjectId,
  bookmarkedType: String,
  owner: Schema.Types.ObjectId,
});

BookmarkSchema
    .virtual('createdAt')
    .get(function () {
      return this._id.getTimestamp();
    });

BookmarkSchema.set('toJSON', { virtuals: true, getters: true });
BookmarkSchema.set('toObject', { virtuals: true, getters: true });

module.exports = mongoose.model('Bookmark', BookmarkSchema);
