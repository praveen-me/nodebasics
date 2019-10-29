import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typedefs.js";
import resolvers from "./resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers
});

export default server;
