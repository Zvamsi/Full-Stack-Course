const express = require("express");
const path = require("path");
const JsonWebToken = require("jsonwebtoken");

const app = express();
app.use(express.json());
let token = "";

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

const KEY =
  "93c0a2f5dd4dfaa86707d3a8e3fa74c5923d0b105004ff34987535ae04b4758b2dd4f3dc35321df37bedee2e695f9f1a3e651797cf8ac33e776056ba046283e8e24671e8d618bf8a50ca92fcbbdd9f5b6779d755c33321bf40234bc2bca77babf294e87a4395a18ed37d669bc2d27d1f8a55e407a137b0edce2083b7b4b1263277d0dc880e33b614188a0b00088ed655980bc4435b9d49c2dab6b0bfddf46aa57cd268cf088247574bb7ba22a16aff15058844753cf90e806f4b2872ecd75b5059d56a49bf9eae43ff039175f82d5d419f12e340e20f02101b5afa383efafc5f2d561f6495c9b8141398bb8b0f16eee79187106ca9579f72eb66f586a194b6db";

//Middleware to generate JSON token.
const generateToken = (user = {}) => {
  return JsonWebToken.sign(user, KEY, { expiresIn: "1h" });
};

const authMiddle = (req, resp, next) => {
  const token = req.headers.authorization;
  if (!token) {
    console.log("No token provided");
    return resp.status(404).json({
      status: "failure",
      message: "The token is either not found or unauthorized",
    });
  }
  //Remove the Bearer if present
  const bearer = token.startWith("bearer") ? token.slice(7) : token;

  jwt.verify(bearer, KEY, (err, decoded) => {
    if (err) {
      console.log("Error in verifying token", err);
      return resp.status(401).json({ message: "Un Authorised token value" });
    }
    req.user = decoded;
    console.log("User authenticated");
    next();
  });
};

const checkAuth = (req, resp, next) => {
  const Auth = req.headers.authorization;
 
  if (Auth == token) {
    resp.send("success");
    next();
  } else {
    resp.send("fail");
  }
};

app.get("/tapes/:tape", (req, resp) => {
  const tape = req.params.tape * 1;
  const details = data.find((el) => el.tape === tape);
  resp.json(details);
});

app.get("/", (req, resp) => {
  resp.sendFile(path.join(__dirname, "index.html"));
});

app.get("/protected", checkAuth, (req, resp) => {
  console.log(req.body);
  resp.status(200).json(req.headers);
});

app.param((req, resp, next) => {
  if (!req.body.character || !req.body.reason) {
    return resp.status(404).send("The data is redundent");
  }
  next();
});

app.post("/login", (req, resp) => {
  const user = req.body;

  if (!user || Object.keys(user).length === 0) {
    return resp.status(400).json({ message: "user data is required" });
  }
  token = generateToken(user);

  resp.json({ token });
});

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
