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

// create a test GET route
app.get("/test", (req, res) => {
  console.log("GET /test");
  res.send({ express: "HI ITS YOUR BACKEND" });
});

// Json list of the mongodb
app.get("/words", (req, res)=> {
    let db_connect = dbo.getDb("words");
    db_connect
   .collection("words")
   .find()
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
})

//this helps create a new word
app.post("/words/add", (req, response) => {
    console.log(req.body)
    
    let db_connect = dbo.getDb();
    let myobj = {
        word: req.body.word,
        defintion: req.body.defintion,
    };
    db_connect.collection("words").insertOne(myobj, (err, res)=>{
        if (err) throw err;
        console.log("1 word added")
        response.json(res)
    })

})

app.delete("/words/:id", (req, res) =>{
    let db_connect = dbo.getDb();
    let myquery = {_id: ObjectId(req.params.id)};
    db_connect.collection("words").deleteOne(myquery, (err, obj) => {
        if(err) throw err;
        console.log("1 word deleted")
        res.json(obj)
    })
}) 

app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.log(err);
  });
  console.log(`Server is running on port: ${port}`);
});
