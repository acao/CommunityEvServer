import Subscription from '../models/Subscription';

class Subscriptions {
  getAll() {
    return Subscription.find().exec();
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
}

export default Subscriptions;
