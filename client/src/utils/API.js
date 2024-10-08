// User Management
export const getMe = async (token) => {
    return fetch('api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const createUser = async (userData) => {
    return fetch('api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  export const loginUser = async (userData) => {
    return fetch('api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  
  // Chat API (Using react-chat-engine)
  export const sendMessage = async (projectID, chatId, message, token) => {
    return apiRequest(`/chats/${chatId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        project_id: projectID,
        text: message,
      }),
    });
  };
  
  // Stripe Payment Integration
  export const createCheckoutSession = async (paymentData) => {
    return fetch('api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
  };
  
  // GraphQL API (Apollo)
  export const graphqlRequest = async (query, variables = {}) => {
    return fetch('api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
  };
  
