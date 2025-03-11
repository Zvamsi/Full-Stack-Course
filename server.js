var express = require("express");
var app = express();
const path = require("path");
const port = 3000;

const data = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
  },
  {
    id: 3,
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
  },
  {
    id: 4,
    name: "David White",
    email: "david.white@example.com",
  },
  {
    id: 5,
    name: "Emma Brown",
    email: "emma.brown@example.com",
  },
];

app.use(express.json());

app.param("id", (req, resp, next, value) => {
  if (value * 1 > data.length || value * 1 < 0) {
    return resp.status(404).json({
      status: "fail",
      message: "The id is out of range",
    });
  }
  next();
});

app.use((req, resp, next) => {
  const checkDuplicate = data.some((el) => el.email === req.body.email);
  if (checkDuplicate)
    return resp.status(400).json({
      status: "failure",
      message: "The data is already present",
    });
  if (!req.body.name || !req.body.email) {
    return resp.json({
      status: "failure",
      messsage: "data is inadequate",
    });
  }
  next();
});

app.get("/", (req, res) => {
  res.json({
    status: "success",
    data,
  });
});

app.post("/", (req, resp) => {
  const newOne = { id: data.length + 1 };
  Object.assign(newOne, req.body);
  //   const newData = {
  //     id: data.length + 1,
  //     name: req.body.name,
  //     email: req.body.email,
  //   };
  data.push(newOne);
  resp.json({
    newOne,
  });
});

app.get("/:id", (req, resp) => {
  //   console.log(req.params.id);
  const id = req.params.id * 1; //Converting to string nothing else...
  const singleData = data.find((el) => el.id === id);

  resp.json({
    status: "succss",
    singleData,
  });
});

app.get("/contact", (req, resp) => {
  resp.status(302).end("contact page");
});

app.listen(port, () => {
  console.log("The server is starting");
});
