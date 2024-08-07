const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Character {
    _id: ID!
    name: String!
    description: String
    inventory: [String]
    location: String
  }

  type Story {
    _id: ID!
    title: String!
    text: String!
    choices: [Choice]
  }

  type Choice {
    _id: ID!
    text: String!
    outcome: StoryOutcome
  }

  type StoryOutcome {
    story: Story
    success: Boolean
  }

  type Chat {
    _id: ID!
    name: String!
    participants: [User]
    createdAt: String
  }

  type ChatMessage {
    _id: ID!
    chatID: ID!
    sender: User
    text: String!
    timestamp: String
  }

  type GameState {
    _id: ID!
    user: User
    level: Int!
    score: Int!
    lastSaved: String
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
   getChatMessages(chatID: ID!): [ChatMessage]
   getGameState(user_id: ID!): GameState
   getUser(_id: ID!): User
  }

  type Mutation {
    addUser( UserInput: UserInput!): Auth
    login(email: String!, password: String!): Auth
    createChat(name: String!, participants: [ID]!): Chat
    sendMessage(chatID: ID!, sender: ID!, text: String!): ChatMessage
    updateGameState(user_id: ID!, level: Int!, score: Int!): GameState
    updateUser(_id: ID!, username: String, email: String, bio: String, avatar: String): User
  }
    
  input UserInput {
    username: String
    email: String!
    password: String!
  }
  `;

  module.exports = typeDefs;
