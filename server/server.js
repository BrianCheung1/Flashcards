const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.port || 5000;
app.use(cors());
app.use(express.json());
//get driver connection
const dbo = require("./db/conn");
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
const jwtAuth = require("./middleware/jwtAuth");

// create a test GET route
// app.get("/test", (req, res) => {
//   let db_connect = dbo.getDb("words");
//   db_connect
//     .collection("users")
//     .find()
//     .toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
// });

// Json list of the mongodb
app.get("/words", jwtAuth.authenticateToken, (req, res) => {
  let db_connect = dbo.getDb("words");
  db_connect
    .collection("words")
    .find()
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

app.get("/word/:id", jwtAuth.authenticateToken, (req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("words").findOne(myquery, (err, obj) => {
    if (err) throw err;
    console.log("1 word found");
    res.json(obj);
  });
});

//this helps create a new word
app.post("/words/add", jwtAuth.authenticateToken, (req, response) => {
  console.log(req.body);

  let db_connect = dbo.getDb();
  let myobj = {
    word: req.body.word,
    definition: req.body.definition,
  };
  db_connect.collection("words").insertOne(myobj, (err, res) => {
    if (err) throw err;
    console.log("1 word added");
    response.json(res);
  });
});

app.delete("/words/:id", jwtAuth.authenticateToken, (req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("words").deleteOne(myquery, (err, obj) => {
    if (err) throw err;
    console.log("1 word deleted");
    res.json(obj);
  });
});

app.post("/update-word/:id", jwtAuth.authenticateToken, (req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      word: req.body.word,
      definition: req.body.definition,
    },
  };

  db_connect
    .collection("words")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

//store new user into database
app.post("/register", (req, response) => {
  let db_connect = dbo.getDb();
  let myobj = {
    username: req.body.username,
    password: req.body.password,
  };
  db_connect.collection("users").insertOne(myobj, (err, res) => {
    if (err) throw err;
    console.log("1 user added");
    response.json(res);
  });
});

//get user info from database
app.get("/login-user", async (req, res) => {
  let db_connect = dbo.getDb();
  db_connect
    .collection("users")
    .find({ username: req.query.username })
    .toArray((err, docs) => {
      if (err) {
        throw err;
      } else {
        docs.map((element) => {
          const token = jwtAuth.generateAccessToken(req.query.username);
          res.cookie("token", token, { path: "/" });
          res.send(element);
        });
      }
    });
});

app.get("/user/:id", jwtAuth.authenticateToken, async (req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let count = await db_connect.collection("users").count(myquery);
  if (count > 0) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.log(err);
  });
  console.log(`Server is running on port: ${port}`);
});
