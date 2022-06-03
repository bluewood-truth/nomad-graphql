<h1 align="center">GraphQL로 영화 API 만들기</h1>

<p align="center">
<img src="https://img.shields.io/badge/-GraphQL-brightgreen" />
<img src="https://img.shields.io/badge/-Apollo Server-brightgreen" />
</p>

Nomad Coders의 강좌 [GraphQL로 영화 API 만들기](https://nomadcoders.co/graphql-for-beginners)를 공부하며 정리한 Repo입니다.

## 개념 정리

### API?

- **API = Application Programming Interface**

- **Interface**란 무언가와 **상호작용**하기 위해 사용자에게 제공되는 수단이다.
  - 리모컨의 버튼 = TV와 사용자의 상호작용을 위한 인터페이스
  - UI = 웹사이트와 사용자의 상호작용을 위한 인터페이스
  - **API** = 프로그래밍을 위해 어플리케이션과의 상호작용을 위한 인터페이스
- 서버에서 준비해둔 버튼을 누르고 싶을 때(서버가 제공하는 기능을 사용하고 싶을 때) API를 사용한다.
- 즉 API란 서버와 통신하기 위한 수단이다.
- API는 내 사이트에서만 사용할 수 있도록 private하게 만들 수도 있고, 깃헙, 인스타그램, 페이스북 API처럼 public하게 만들 수도 있다.
- REST API와 GraphQL API의 차이는 버튼이 어떻게 노출되어 있는지(어떻게 데이터에 접근하고 서버와 통신하는지)에 대한 차이이다.

### REST API?

- URL을 통해 리소스에 접근한다.
- URL을 사용하기 때문에 대부분의 디바이스, 환경에서 사용할 수 있다.
- 컨벤션이 정해져 있기 때문에 이해하기 쉽다.
  - 복수명사를 사용
  - ID나 파라미터로 원하는 리소스를 찾음
  - URL에 동사를 넣지 않음 - HTTP 메서드로 동작을 결정함

### GraphQL?

- GraphQL은 명세(specification)이다.
  - 다운로드받아서 사용하는 라이브러리가 아님

- REST API의 문제를 해결하기 위해 만들어졌다.

  - **over-fetching**: 필요 이상의 데이터를 fetch하는 문제
    - 백엔드, 데이터베이스가 더 많은 일을 하게 됨
    - 데이터의 양이 많아져 통신이 느려짐
    - → GraphQL은 쿼리를 통해 필요한 데이터만 요청하고 받을 수 있음

  - **under-fetching**: 필요한 것보다 적은 데이터를 받음으로 인해 추가적인 fetch가 필요한 문제
    - 한 화면을 보여주기 위해 여러 번의 request가 필요할 수 있음
    - 로딩 시간의 증가, request의 실패 등의 문제 발생 가능성이 있음
    - → GraphQL은 한 번의 요청으로 필요한 데이터를 전부 받아올 수 있음

### Apollo Server

- GraphQL 명세를 구현한 open-source Server이다.
- 서버를 만들기 위해 GraphQL SDL로 데이터의 형태(shape)를 정의해줘야 한다.
  - Apollo Server에서는 typeDefs 객체를 정의함

#### GraphQL Types

- 모든 GraphQL API는 **Query type**이 필수적이다.
  - Query 타입 안에 사용자가 요청할 수 있는 모든 리소스를 정의함
  - REST API로 따지면 새로운 GET 엔드포인트를 만드는 것과 같음
- GraphQL은 **Object type**을 자유롭게 정의할 수 있다.
  - 객체 타입은 이름과 필드를 가짐
- 각 필드의 타입은 어느 시점에서 특정한 데이터로 해석되어야 하는데, 이때 **Scalar type**을 사용한다.
  - GraphQL은 기본적인 스칼라 타입을 제공함
    - Int, Float, String, Boolean, ID
  - 혹은 scalar 키워드로 직접 스칼라 타입을 정의할 수 있음
- 데이터를 변경하는 요청을 받기 위해서는 **Mutation type**을 정의한다.
  - mutation이란 데이터를 변경(추가, 수정, 삭제)하는 것을 말함
  - REST API로 따지면 POST, PUT, DELETE 엔드포인트를 만드는 것
- 모든 타입은 기본적으로 Nullable이며, null값이 못 오게 하려면 `!`를 붙인다.

