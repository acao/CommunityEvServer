import { Schema } from 'mongoose';
import { instantiateModel } from './';

const SubscriptionSchema = new Schema({
  updatedAt: { type: Date },
  subscribedId: String,
  subscribedType: String,
  ownerId: Schema.Types.ObjectId,
});

SubscriptionSchema
    .virtual('createdAt')
    .get(function () {
      return this._id.getTimestamp();
    });

SubscriptionSchema.set('toJSON', { virtuals: true, getters: true });
SubscriptionSchema.set('toObject', { virtuals: true, getters: true });

export default instantiateModel('Subscription', SubscriptionSchema);
