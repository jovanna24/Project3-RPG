const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Character {
    id: ID!
    name: String!
    description: String
    inventory: [String]
    location: String
  }

  type Story {
    id: ID!
    title: String!
    text: String!
    choices: [Choice]
  }

  type Choice {
    id: ID!
    text: String!
    outcome: StoryOutcome
  }

  type StoryOutcome {
    story: Story
    success: Boolean
  }

  type Chat {
    id: ID!
    name: String!
    participants: [User]
    createdAt: String
  }

  type ChatMessage {
    id: ID!
    chatID: ID!
    sender: User
    text: String!
    timestamp: String
  }

  type GameState {
    id: ID!
    user: User
    level: Int!
    score: Int!
    lastSaved: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    profile: UserProfile
    createdAt: String
  }

  type UserProfile {
    bio: String
    avatar: String
  }

  input UserProfileInput {
    bio: String
    avatar: String
  }

  type Query {
    getCharacter(id: ID!): Character
    getStory(id: ID!): Story
    getChat(id: ID!): Chat
    getChatMessages(chatID: ID!): [ChatMessage]
    getGameState(userId: ID!): GameState
    getUser(id: ID!): User
  }

  type Mutation {
    updateCharacter(id: ID!, inventory: [String], location: String): Character
    createStory(title: String!, text: String!): Story
    makeChoice(storyId: ID!, choiceId: ID!): StoryOutcome
    createChat(name: String!, participants: [ID!]!): Chat
    sendMessage(chatID: ID!, sender: ID!, text: String!): ChatMessage
    updateGameState(userId: ID!, level: Int!, score: Int!): GameState
    updateUser(id: ID!, username: String, email: String, password: String, profile: UserProfileInput): User
  }
`;

module.exports = typeDefs;
