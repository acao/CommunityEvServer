import User from '../models/User';

class Users {
  getList() {
    const getUsers = User.find({}).exec();
    return getUsers;
  }

  signup(username, password) {
    var user = new User({ username, password });
    return user.save();
  }

  login(username, password, done) {
    let findUser = User.findOne({ username }).exec();
    let user = {};
    return findUser.then((data) => {
      user = data;
      return user.validPassword(password);
    }).then(()=> {
      return done(null, user);
    }, (err)=> {
      return done(null, false, { message: 'Username and password do not match.' });
    });
  }

  updateMail(id, mail) {
    const getUser = User.findOne({_id: id}).exec();
    return getUser.then((user) => {
      user.mail = mail;
      return user.save();
    });
  }
}

export default Users;
