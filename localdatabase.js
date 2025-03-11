const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test");

const testSchema = new mongoose.Schema({
  name: String,
  rating: Number,
});

// const toursModal = mongoose.model("tours", toursSchema);
const listModal = mongoose.model("tours", testSchema);

app.get("/", (req, resp) => {
  try {
    listModal
      .find({})
      .then((res) => resp.json(res))
      .catch((err) => console.log(err));
  } catch (err) {
    resp.send(err);
  }
});

app.listen(3000, () => {
  console.log("the server is running in 3000");
});
