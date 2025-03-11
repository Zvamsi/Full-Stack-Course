const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test");

const testSchema = new mongoose.Schema({
  name: String,
  rating: Number,
});

// 🔴🔴🔴 THE NAME OF COLLECTIONS SHOULD BE IN PLURAL FORM, THEN ONLY THEY WORK IF NOT THEY CONVERT TO PLURAL FORM
//EVEN THEY DECLARE IN SINGULAR... (i.e.male to males, try to tries)
const listModal = mongoose.model("try", testSchema);

app.get("/", async (req, resp) => {
  try {
    const data = await listModal.find();
    resp.json(data);
  } catch (err) {
    resp.send(err);
  }
});

app.listen(3000, () => {
  console.log("the server is running in 3000");
});
