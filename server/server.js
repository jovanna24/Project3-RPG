const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');


const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

app.use(cors());

app.get('/api/token', (req, res) => {
  const id_token = req.headers.authorization?.split(' ').pop().trim();
  if (!id_token) return res.status(400).json({ error: 'No token provided' });

  try {
    // Verify the ID token
    const user = authMiddleware({ req: { headers: { authorization: `Bearer ${id_token}` } } }).user;
    if (user) {
      // Generate a new token for Weavy
      const newToken = authMiddleware.signToken(user);
      res.json({ token: newToken });
    } else {
      res.status(401).json({ error: 'Invalid token' });
    }
  } catch (err) {
    console.error('Failed to generate token:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  // api endpoints
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware}));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  } 

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
