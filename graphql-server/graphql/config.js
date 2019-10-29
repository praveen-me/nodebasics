import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typedefs.js";
import resolvers from "./resolvers.js";
import {
  FormattableDateDirective,
  AuthDirective,
  UniqueIdDirective
} from "./directives.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    date: FormattableDateDirective,
    auth: AuthDirective,
    uniqueId: UniqueIdDirective
  }
});

export default server;
