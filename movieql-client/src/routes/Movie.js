import {gql, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';

const MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
    }
  }
`;

const Movie = () => {
  const {id} = useParams();
  const {data, loading, error} = useQuery(MOVIE, {
    variables: {id: parseInt(id)},
  });

  if (loading) {
    return <h1>loading...</h1>;
  }

  if (error) {
    return <h1>cannot fetch :(</h1>;
  }

  return (
    <div>
      <h1>{data.movie.title}</h1>
    </div>
  );
};

export default Movie;
