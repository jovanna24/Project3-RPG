require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const SECRET_KEY = process.env.JWT_SECRET || 'mysecretssshhhhhhh';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    if (token) {
      try {
        const user = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
        return { user };
      } catch (e) {
        console.warn(`Unable to authenticate using auth token: ${token}`);
      }
    }
    return {};
  },
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  server.applyMiddleware({ app, path: '/graphql' });

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
