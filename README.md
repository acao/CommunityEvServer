# CommunityEvServer
For the CommunityEv react native app, a backend for bookmarking, subscriptions, managing lists of events and accessing fields and edges that OG doesn't provide.

[![Build Status](https://travis-ci.org/acao/CommunityEvServer.svg?branch=master)](https://travis-ci.org/acao/CommunityEvServer)

## Usage

### Start the Development Server
```Bash
npm start
```

When starting the server there are a couple of parameters you can pass:
* verbose - Enable verbose output
* release - Enable release mode, which will generally disable debugging features

Hot reloading is in place, so you do not need to restart the server on file change.

#### Environment Variables
The following environment variables are supported:
* PORT - defaults to 1234 if not set

### Deployment
If you want to deploy your application, simply copy the build folder and invoke
```Bash
node server.js
```

## GraqhQL Examples

### Create User
```graphql
mutation CreateUser($username: String!, $password: Password!){
  signup(username:$username, password: $password) {
    _id
    username
    createdAt
    updatedAt
    mail
  }
}
```
input:

```json
{
  "bookmarkedId": "Bob",
  "bookmarkedType": "Bob"
}
```
### Add Bookmark

```graphql
mutation AddBookMark($bookmarkedId: Int!, $bookmarkedType: String!){
  addBookmark(
    bookmarkedId: $bookmarkedId,
	bookmarkedType: $bookmarkedType
  )
  {
    bookmarkedId,
    bookmarkedType
  }
}
```
input:

```json
{
  "bookmarkedId": 12121212,
  "bookmarkedType": "Event"
}
```
