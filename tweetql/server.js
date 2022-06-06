import {ApolloServer, gql} from 'apollo-server';

let tweets = [
  {
    id: '1',
    text: 'hello',
  },
  {
    id: '2',
    text: 'hello',
  },
  {
    id: '3',
    text: 'hello',
  },
];

let users = [
  {
    id: '1',
    firstName: 'Hanseul',
    lastName: 'Kim',
  },
];

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
  }

  type Tweet {
    id: ID!
    text: String!
    author: User
  }

  type Query {
    allTweets: [Tweet!]! # GET /api/v1/tweets
    tweet(id: ID!): Tweet # GET /api/v1/tweets/:id
    allUsers: [User!]!
  }

  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet! # POST /api/v1/tweets
    deleteTweet(id: ID!): Boolean! # DELETE /api/v1/tweets/:id
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    // 항상 첫번째 인수는 root, 두번째 인수는 요청의 arguments
    tweet(_, {id}) {
      return tweets.find((tweet) => tweet.id === id);
    },
    allUsers() {
      return users;
    }
  },
  Mutation: {
    postTweet(_, {text}) {
      const newTweet = {
        id: tweets.length + 1,
        text,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(_, {id}) {
      const toDelete = tweets.find((tweet) => tweet.id === id);
      if (!toDelete) return false;
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },
  User: {
    fullName({firstName, lastName}) {
      return `${firstName} ${lastName}`;
    }
  }
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
  console.log(`Running on ${url}`);
});
