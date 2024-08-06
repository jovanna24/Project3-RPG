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
    getStory(id: I
