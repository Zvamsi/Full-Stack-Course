const express = require("express");
const app = express();

const data = [];

app.get("/", (req, resp) => {
  resp.send("The Home tab");
});

app.post("/", (req, resp) => {
  const newData = req.body;
  data.push(newData);
});

app.listen(3000, () => {
  console.log("The server is listening on 3000");
});
