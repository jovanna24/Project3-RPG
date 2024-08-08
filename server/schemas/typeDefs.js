const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Character {
    _id: ID!
    name: String!
    description: String
    inventory: [String]
    location: String
  }

  type Chat {
    _id: ID!
    name: String!
    participants: [User]
    createdAt: String
  }

  type ChatMessage {
    _id: ID!
    chatId: ID!
    sender: User
    text: String!
    timestamp: String
  }


  type User {
    _id: ID!
    username: String!
    email: String!
    bio: String
    avatar: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
   me: User
   getSingleUser(userId: ID, username: String): User
   getChat(_id: ID!): Chat
   getChatMessages(chatId: ID!): [ChatMessage]
   getUser(_id: ID!): User
  }

  type Mutation {
    addUser( userInput: UserInput!): Auth
    login(usernameOrEmail: String!, password: String!): Auth
    createChat(name: String!, participants: [ID]!): Chat
    sendMessage(chatId: ID!, sender: ID!, text: String!): ChatMessage
    updateUser(_id: ID!, username: String, email: String, bio: String, avatar: String): User
  }
    
  input UserInput {
    username: String
    email: String!
    password: String!
  }
  `;

  module.exports = typeDefs;
