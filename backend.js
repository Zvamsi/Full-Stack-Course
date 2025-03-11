const express = require("express");
const app = express();
const cors = require("cors");

const port = 2500;

app.use(express.json());
app.use(cors());

let book = [
  { id: 1, title: "Adbutham", author: "no idea", year: 2023 },
  { id: 2, title: "Alice In BorderLand", author: "no idea", year: 2024 },
  { id: 3, title: "Leo", author: "Lokesh Kanagaraj", year: 2024 },
  { id: 4, title: "Jailer", author: "Nelson", year: 2024 },
  { id: 5, title: "Vikram", author: "Lokesh Kanagaraj", year: 2024 },
];

app.get("/", (req, res) => {
  res.json(book);
});

app.get("/:id", (req, res) => {
  const id = req.params.id * 1;
  console.log(id);
  const singleBook = book.find((el) => el.id === id);
  res.json({ singleBook });
});

app.post("/", (req, res) => {
  const { title, author, year } = req.body;
  const newbook = {
    id: book.length + 1,
    title,
    author,
    year,
  };
  book.push(newbook);
  res.json(newbook);
});

app.listen(port, () => {
  console.log("Server Running on port http://localhost:2500");
});
