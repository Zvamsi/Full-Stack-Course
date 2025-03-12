const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 4500;

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/books")
  .then(() => console.log("Database connected successfully"));

const booksSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: {
    type: Number,
    default: 2000,
  },
});

const booksModel = mongoose.model("books", booksSchema);

// let book = [
//   { id: 1, title: "Adbutham", author: "no idea", year: 2023 },
//   { id: 2, title: "Alice In BorderLand", author: "no idea", year: 2024 },
//   { id: 3, title: "Leo", author: "Lokesh Kanagaraj", year: 2024 },
//   { id: 4, title: "Jailer", author: "Nelson", year: 2024 },
//   { id: 5, title: "Vikram", author: "Lokesh Kanagaraj", year: 2024 },
// ];

app.get("/", async (req, res) => {
  // res.json(book);
  try {
    const book = await booksModel.find();
    res.json(book);
  } catch (err) {
    res.send("Error");
  }
});

app.post("/", async (req, res) => {
  const { title, author, year } = req.body;
  const newbook = new booksModel({
    title,
    author,
    year,
  });
  const saved = await newbook.save();
  res.status(201).json(saved);
});

app.get("/:id", (req, res) => {
  const id = req.params.id * 1;
  console.log(id);
  const singleBook = book.find((el) => el.id === id);
  res.json({ singleBook });
});

app.listen(port, () => {
  console.log("Server Running on port http://localhost:2500");
});
