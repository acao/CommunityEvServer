require('dotenv').load();
import { Schema } from './schema';
import graphqlHTTP from 'express-graphql';
import express from 'express';
import 'babel-polyfill';
import path from 'path';
import mongoose from 'mongoose';
import passport from './passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import User from './models/User';
import mongoStore from 'connect-mongo';

const MongoStore = mongoStore(session);
const port = (!global.process.env.PORT) ? 1234 : global.process.env.PORT;
const server = global.server = express();

mongoose.connect(`mongodb://${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_NAME}`);

server.set('port', port);
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(passport.initialize());
server.use(passport.session());
server.use(session({
  secret: process.env.APP_SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

server.get('/auth/google', passport.authenticate('google', {scope: 'https://www.google.com/m8/feeds'}));
server.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
}));

server.get('/auth/facebook', passport.authenticate('facebook'));
server.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/'
}));

// server.post('/login', passport.authenticate('local'), function(req, res) {
//   res.sendStatus(200);
// });
//
// server.get('/logout', function(req, res) {
//   req.logout();
//   req.session.destroy();
//   res.sendStatus(200);
// });

server.use('/graphql', graphqlHTTP(request => ({
  schema: Schema,
  rootValue: { session: request.session },
  graphiql: true
})));

server.listen(server.get('port'), () => {
  console.log('The server is running at http://localhost:' + server.get('port'));
});
