import { gql } from '@apollo/client'; // Import gql from Apollo Client

export const GET_USER = gql`
query Me {
  me {
    _id
    username
    email
    bio
    avatar
    createdAt
  }
}
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      _id
      username
      email
    }
  }
`;


export const GET_CHAT_MESSAGES = gql`
query GetChatMessages($chatId: ID!) {
  getChatMessages(chatId: $chatId) {
    _id
    chatId
    sender {
      _id
      username
    }
    text
    timestamp
  }
}
`;



