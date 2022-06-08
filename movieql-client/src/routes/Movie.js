import {gql, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

const MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      rating
      isLiked @client
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Image = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

const Movie = () => {
  const {id} = useParams();
  const {
    data,
    loading,
    client: {cache},
  } = useQuery(MOVIE, {
    variables: {id: parseInt(id)},
  });

  const clickHandler = () => {
    cache.writeFragment({
      id: `Movie:${id}`, // 캐시 id (타입:오브젝트id)
      fragment: gql`
        fragment MovieFragment on Movie { # 어떤 타입을 변경할 건지 지정
          isLiked # 변경할 필드를 지정
        }
      `,
      data: {
        isLiked: !data.movie?.isLiked, // 변경할 필드에 넣을 값을 지정
      },
    });
  };

  return (
    <Container>
      <Column>
        <Title>{loading ? 'Loading...' : `${data.movie?.title}`}</Title>
        <Subtitle>⭐️ {data?.movie?.rating}</Subtitle>
        <button onClick={clickHandler}>
          {data?.movie?.isLiked ? 'Unlike' : 'Like'}
        </button>
      </Column>
      <Image bg={data?.movie?.medium_cover_image} />
    </Container>
  );
};

export default Movie;
