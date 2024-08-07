import { gql } from '@apollo/client'; // Import gql from Apollo Client

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      email
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      username
      email
    }
  }
`;


export const GET_CHAT_MESSAGES = gql`
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

export const GET_USER_PROFILE = gql`
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

