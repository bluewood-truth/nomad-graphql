import {ApolloServer, gql} from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
  }

  type Tweet {
    id: ID!
    text: String!
    author: User!
  }

  type Query {
    allTweets: [Tweet!]! # GET /api/v1/tweets
    tweet(id: ID!): Tweet # GET /api/v1/tweets/:id
  }

  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet! # POST /api/v1/tweets
    deleteTweet(id: ID!): Boolean! # DELETE /api/v1/tweets/:id
  }
`;

const server = new ApolloServer({typeDefs});

server.listen().then(({url}) => {
  console.log(`Running on ${url}`);
});
