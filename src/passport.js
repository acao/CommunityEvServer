import passport from 'passport';
import passportFacebook from 'passport-facebook';
import passportGoogle from 'passport-google-oauth';
import passportLocal from 'passport-local';
import Users from './lib/users';

const GoogleStrategy = passportGoogle.OAuth2Strategy;
const FacebookStrategy = passportFacebook.Strategy;
const LocalStrategy = passportLocal.Strategy;
const users = new Users();

if (process.env.FACEBOOK_ID){
  passport.use(new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CB,
    },
    function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  ));
}
if (process.env.GOOGLE_ID){
  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CB,
    },
    function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  ));

  passport.use(new LocalStrategy(
    function(username, password, done) {
      users.login(username, password, done);
    }
  ));
}


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

export default passport;
