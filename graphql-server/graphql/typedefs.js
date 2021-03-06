import gql from "graphql-tag";

const typeDefs = gql`
  directive @date(defaultFormat: String = "mmmm dd, yyyy") on FIELD_DEFINITION

  directive @auth on OBJECT | FIELD_DEFINITION

  directive @uniqueId(name: String = "uid", from: [String] = ["id"]) on OBJECT

  scalar Date

  type Author @auth @uniqueId(from: ["firstName", "id", "lastName"]) {
    id: ID! # the ! means that every author object _must_ have an id
    firstName: String
    lastName: String
  }

  type Post {
    id: ID!
    title: String
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    posts: [Post]
    today: Date @date
    me: Author
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost(postId: ID!): Post
  }

  # we need to tell the server which types represent the root query
  # and root mutation types. We call them RootQuery and RootMutation by convention.
  schema {
    query: Query
    mutation: Mutation
  }
`;

export default typeDefs;
