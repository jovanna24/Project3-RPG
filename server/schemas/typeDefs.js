const { gql } = require('apollo-server-express');

const typeDefs = gql`

scalar Date

  type User {
    _id: ID!
    username: String!
    email: String!
    bio: String
    avatar: String
    createdAt: Date
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
   me: User
   getSingleUser(userId: ID, username: String): User
   getAllUsers: [User]
   }

  type Mutation {
    addUser( userInput: UserInput!): Auth
    login(usernameOrEmail: String!, password: String!): Auth    
    updateUser(_id: ID!, username: String, email: String, bio: String, avatar: String): User
  }
    
  input UserInput {
    username: String
    email: String!
    password: String!
  }
  `;

  module.exports = typeDefs;
