import { gql } from '@apollo/client'; // Import gql from Apollo Client

export const GET_USER_QUERY = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      email
    }
  }
`;

export const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers {
    users {
      id
      username
      email
    }
  }
`;

export const GET_GAME_STATE_QUERY = gql`
  query GetGameState($id: ID!) {
    gameState(id: $id) {
      id
      level
      score
    }
  }
`;

export const GET_ALL_GAME_STATES_QUERY = gql`
  query GetAllGameStates {
    gameStates {
      id
      level
      score
    }
  }
`;

export const GET_CHAT_MESSAGES_QUERY = gql`
  query GetChatMessages($chatID: ID!) {
    chatMessages(chatID: $chatID) {
      id
      text
      sender {
        id
        username
      }
      timestamp
    }
  }
`;

export const GET_USER_PROFILE_QUERY = gql`
  query GetUserProfile {
    me {
      id
      username
      email
      profile {
        bio
        avatar
      }
    }
  }
`;

