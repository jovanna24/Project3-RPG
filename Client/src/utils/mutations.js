import { gql } from '@apollo/client'; // Import gql from Apollo Client

// Define your GraphQL mutations
export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
      email
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      username
      email
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      username
    }
  }
`;

export const SAVE_GAME_STATE_MUTATION = gql`
  mutation SaveGameState($input: SaveGameStateInput!) {
    saveGameState(input: $input) {
      id
      level
      score
    }
  }
`;

export const DELETE_GAME_STATE_MUTATION = gql`
  mutation DeleteGameState($id: ID!) {
    deleteGameState(id: $id) {
      id
      level
    }
  }
`;

