# server/schema/typeDefs.js

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

  type Query {
    getCharacter(id: ID!): Character
    getStory(id: ID!): Story
  }

  type Mutation {
    updateCharacter(id: ID!, inventory: [String], location: String): Character
    createStory(title: String!, text: String!): Story
    makeChoice(storyId: ID!, choiceId: ID!): StoryOutcome
  }
`;

module.exports = typeDefs;
