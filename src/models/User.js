import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import Bookmark from './Bookmark';
import Subscription from './Subscription';
import { instantiateModel } from './';
const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  updatedAt: { type: Date },
  // bookmarks: [Bookmark],
  // subscriptions: [Subscription],
  mail: { type: String }
});

UserSchema
.virtual('createdAt')
.get(function () {
  return this._id.getTimestamp();
});

UserSchema.set('toJSON', { virtuals: true, getters: true });
UserSchema.set('toObject', { virtuals: true, getters: true });

UserSchema.pre('save', function(next) {
  var user = this;
  const now = new Date();

  user.updatedAt = now;

  if(!user.isModified('password')) return next();
  bcrypt.genSalt(function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.validPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function(err, match) {
      if (err) reject(err);
      (match) ? resolve() : reject('Passwords do not match');
    });
  });
};

export default instantiateModel('User', UserSchema);
