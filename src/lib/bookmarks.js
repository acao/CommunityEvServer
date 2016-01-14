import Bookmark from '../models/Bookmark';

class Bookmarks {
  getAll(query) {
    return Bookmark.find(query).exec();
  }
  getById(id) {
    return Bookmark.findOne({ _id: id }).exec()
  }
  getAllByOwner(ownerId) {
    return Bookmark.find({ ownerId }).exec()
  }
  getAllForItem(bookmarkedId) {
    return Bookmark.find({ bookmarkedId }).exec()
  }
  create(bookmarkedId, bookmarkedType) {
    var bookmark = new Bookmark({bookmarkedId, bookmarkedType});
    return bookmark.save();
  }
  remove(id) {
    return Bookmark.remove({ _id: id });
  }
}

export default Bookmarks;
