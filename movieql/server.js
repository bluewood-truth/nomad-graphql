import {ApolloServer, gql} from 'apollo-server';
import axios from 'axios';

const typeDefs = gql`
  type Query {
    allMovies: [Movie!]!
    movie(id: Int!): Movie
  }

  type Movie {
    id: Int!
    url: String!
    imdb_code: String!
    title: String!
    title_english: String!
    title_long: String!
    slug: String!
    year: Int!
    rating: Float!
    runtime: Int!
    genres: [String!]!
    summary: String
    description_full: String
    synopsis: String
    yt_trailer_code: String!
    language: String!
    mpa_rating: String!
    background_image: String!
    background_image_original: String!
    small_cover_image: String!
    medium_cover_image: String!
    large_cover_image: String!
  }
`;

const resolvers = {
  Query: {
    async allMovies() {
      const res = await axios.get('https://yts.mx/api/v2/list_movies.json');
      if (res.status !== 200) throw new Error('Fail to fetch movie list');
      return res.data.data.movies;
    },
    async movie(_, {id}) {
      const res = await axios.get(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
      );
      if (res.status !== 200) throw new Error('Fail to fetch movie details');
      return res.data.data.movie;
    },
  },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
  console.log(`Running on ${url}`);
});
