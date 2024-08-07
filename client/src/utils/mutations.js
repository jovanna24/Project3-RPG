import { gql } from '@apollo/client'; // Import gql from Apollo Client

export const ADD_USER = gql`
mutation addUser($userInput: UserInput!) {
  addUser(userInput: $userInput) {
    token
    user {
      _id
      username
      email
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

export const SEND_MESSAGE = gql`
    mutation SendMessage($chatID: ID!, $sender: ID!, $text: String!) {
        sendMessage(chatID: $chatID, sender: $sender, text: $text) {
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


