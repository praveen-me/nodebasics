const express = require("express");

const app = express();
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.json({
    msg: "woo hoo",
  });
});

app.post("product", (req, res) => {});

app.listen(PORT, () => {
  console.log("Server is started on ", PORT);
});
