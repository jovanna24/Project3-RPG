import { gql } from '@apollo/client'; // Import gql from Apollo Client

export const ADD_USER = gql`
  mutation AddUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
      email
    }
  }
`;

export const LOGIN_USER = gql`
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

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      username
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      username
    }
  }
`;

export const SAVE_GAME_STATE = gql`
  mutation SaveGameState($input: SaveGameStateInput!) {
    saveGameState(input: $input) {
      id
      level
      score
    }
  }
`;

export const DELETE_GAME_STATE = gql`
  mutation DeleteGameState($id: ID!) {
    deleteGameState(id: $id) {
      id
      level
    }
  }
`;

