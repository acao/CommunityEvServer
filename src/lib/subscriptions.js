import Subscription from '../models/Subscription';

class Subscriptions {
  getAll() {
    return Subscription.find({}).exec();
  }
  getById(id) {
    return Subscription.findOne({ _id: id }).exec()
  }
  getAllByOwner(ownerId) {
    return Subscription.find({ ownerId }).exec()
  }
  getAllSubscriptionsForItem(subscribedId) {
    return Subscription.find({ subscribedId }).exec()
  }
  create(subscribedId, subscribedType) {
    return Subscription.create({subscribedId, subscribedType});
  }
  remove(id) {
    return Subscription.remove({ _id: id }).exec();
  }
}

export default Subscriptions;
