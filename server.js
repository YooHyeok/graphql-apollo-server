import {ApolloServer, gql} from "apollo-server"

/**
 * SDL :Schema Definition Language
 * 사용자가 요청할 데이터의 타입에대한 정의로 서버에서 필요로 한다.
 */
const typeDefs = gql`

  type User { # 사용자 지정 타입으로 데이터베이스의 관계에 따라 결정된다.
    id: ID!
    username: String! # 이러한 타입을 ScalarType이라고 한다.
  }

  type Tweet { # allTweets이 반환하는 사용자 지정 type이다.
    id: ID!
    text: String!
    author: User
  }

  type Query { # root type
    allTweets: [Tweet!]! # Tweet 타입 형태의 List를 반환한다.
    tweet(id: ID!): Tweet
    ping: String!
  }

  type Mutation {
    postTweet(text: String!, id: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
  
`

const tweets = [
  {
    id: "1",
    text: "first one!",
  },
  {
    id: "1",
    text: "second one!",
  }
]

/**
 * 타입 정의와 같은 형태를 가져야 한다.
 * SDL에서의 타입 이름과 객체 속성명이 같아야 하며
 * 타입에 존재하는 메소드이름이 각각 일치해야 한다.
 */
const resolvers = {
  Query: {
    tweet(root, arg) { // 두번째 매개변수가 서버를통해 사용자로부터 넘겨받을 요청 매개변수이다.
      return tweets.find(tweet =>tweet.id === arg.id);
    },
    ping() {
      return "pong"
    },
    allTweets() {
      return tweets
    }
  }
}

const server = new ApolloServer({typeDefs, resolvers})
server.listen().then(({url}) => {
  console.log(`Running on ${url}`)
}) // listenm은 promise이다.