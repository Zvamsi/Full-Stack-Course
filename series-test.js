const express = require("express");

const app = express();
app.use(express.json());

const data = [
  {
    tape: 1,
    character: "Justin Foley",
    reason:
      "Spread a false rumor that he and Hannah had an intimate moment, damaging her reputation.",
  },
  {
    tape: 2,
    character: "Jessica Davis",
    reason:
      "Betrayed Hannah by believing the rumor and physically slapped her, ruining their friendship.",
  },
  {
    tape: 3,
    character: "Alex Standall",
    reason:
      "Created a 'hot or not' list ranking Hannah as 'Best Ass' in school, objectifying her.",
  },
  {
    tape: 4,
    character: "Tyler Down",
    reason:
      "Secretly took inappropriate photos of Hannah and spread them, invading her privacy.",
  },
  {
    tape: 5,
    character: "Courtney Crimsen",
    reason:
      "Pretended to be Hannah’s friend but spread lies about her to protect herself.",
  },
  {
    tape: 6,
    character: "Marcus Cole",
    reason: "Harassed Hannah during a date, trying to take advantage of her.",
  },
  {
    tape: 7,
    character: "Zach Dempsey",
    reason:
      "Took away Hannah’s encouragement notes from a class project, making her feel invisible.",
  },
  {
    tape: 8,
    character: "Ryan Shaver",
    reason:
      "Published Hannah’s personal poem without permission, exposing her deepest emotions.",
  },
  {
    tape: 9,
    character: "Clay Jensen",
    reason:
      "Included in the tapes, though he didn’t hurt Hannah—she wanted to explain that he was good to her.",
  },
  {
    tape: 10,
    character: "Justin Foley",
    reason:
      "Allowed Bryce Walker to sexually assault Jessica while she was unconscious.",
  },
  {
    tape: 11,
    character: "Sheri Holland",
    reason:
      "Knocked down a stop sign and didn’t report it, leading to a car crash that killed Jeff Atkins.",
  },
  {
    tape: 12,
    character: "Bryce Walker",
    reason:
      "Sexually assaulted Hannah at a party, a traumatic event that pushed her further into despair.",
  },
  {
    tape: 13,
    character: "Mr. Porter",
    reason:
      "Dismissed Hannah’s plea for help and didn’t take her seriously when she hinted at being suicidal.",
  },
];

// const checkAuth = (req, resp, next) => {
//   resp.send("The power is pending");
//   next();
// };

app.get("/tape/:tape", (req, resp) => {
  const tape = req.params.tape * 1;
  const details = data.find((el) => el.tape === tape);
  resp.json(details);
});

// app.get("/pro", (req, resp) => {
//   resp.sendFile(path.join(__dirname, "index.html"));
// });

app.get("/test", (req, resp) => {
  resp.send("test success");
});

app.get("/method", (req, resp) => {
  console.log("THe method object");
  resp.send("The methood is running on the system");
});

// app.get("/", (req, resp) => {
//   resp.sendFile(path.join(__dirname, "index.html"));
// });

// app.get("/protected", (req, resp) => {
//   resp.status(500).json({ message: "the message" });
// });

// app.param((req, resp, next) => {
//   if (!req.body.character || !req.body.reason) {
//     return resp.status(404).send("The data is redundent");
//   }
//   next();
// });

app.post("/", (req, resp) => {
  const tape = { tape: data.length + 1 };
  const newData = Object.assign(tape, req.body);
  data.push(newData);
  resp.json(data);
});

app.put("/:tape", (req, resp) => {
  const tape = req.params.tape * 1;
  const Index = data.findIndex((el) => el.tape === tape);
  if (Index != -1) {
    Object.assign(data[Index], req.body);
    resp.json(data);
  } else {
    resp.status(404).json({ message: "an unknown error is occured" });
  }
});

app.delete("/:tape", (req, resp) => {
  const tape = req.params.tape * 1;
  const Index = data.findIndex((el) => el.tape === tape);
  if (Index != -1) {
    data.splice(Index, 1);
    resp.send("The item is deleted");
  } else {
    resp.send("There was an issue in deleting data");
  }
});

app.listen(4001, () => {
  console.log("The server is running in 4000");
});
