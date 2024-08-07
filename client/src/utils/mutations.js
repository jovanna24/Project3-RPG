import { gql } from '@apollo/client'; // Import gql from Apollo Client

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!, $bio: String, $avatar: String) {
  addUser(username: $username, email: $email, password: $password, bio: $bio, avatar: $avatar) {
    token
    user {
      _id
      username
    }
  }
}
`;


export const LOGIN_USER = gql`
    mutation login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;  

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $username: String, $email: String, $bio: String, $avatar: String) {
    updateUser(_id: $id, username: $username, email: $email, bio: $bio, avatar: $avatar) {
      _id
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

