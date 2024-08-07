const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    signup(name: String!, email: String!, password: String!): AuthPayload
  }
`;

module.exports = typeDefs;
