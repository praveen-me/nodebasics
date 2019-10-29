import express from "express";
import server from "./graphql/config.js";

const app = express();
const PORT = 4001;

server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`Server starts at http://localhost:${PORT}`);
  console.log(
    `Graphql server runs on http://localhost:${PORT}${server.graphqlPath}`
  );
});
