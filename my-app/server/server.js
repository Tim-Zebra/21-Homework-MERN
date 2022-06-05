// Server imports
const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { RestLink } = require('apollo-link-rest');

// Query imports
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// Allows fetching of API (Google Book Search)
const restLink = new RestLink({ uri: "https://www.googleapis.com/books/v1/volumes?q=" });

// Server/App/Port variables
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  link: restLink,
});

client.query({ googleBooks }).then(response => {
  console.log(response);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Call the async function to starts the server
startApolloServer(typeDefs, resolvers);