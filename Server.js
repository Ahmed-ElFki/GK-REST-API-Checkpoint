require("dotenv").config({ path: "./Config/.env" });

const mongoose = require("mongoose");
const usersList = require("./Models/User");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

mongoose.connect(
  "mongodb://localhost:" + process.env.PORT_NUMBER + "/" + process.env.DB_NAME
);

app.get("/Users", (req, res) => {
  try {
    usersList.find().then((data) => res.json(data));
  } catch (e) {
    res.json({ message: e });
  }
});

app.post("/AddUser", (req, res) => {
  const user = new usersList({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });
  user
    .save()
    .then((data) => res.json(data))
    .catch((e) => console.log(e));
});

app.delete("/DeleteUser/:userId", (req, res) => {
  const userId = req.params.userId;
  usersList.findOneAndDelete({ _id: userId }, (err) => {
    res.json({ message: err });
  });
});

app.patch("/UpdateUser/:userId", (req, res) => {
  const userId = req.params.userId;
  const reqData = req.query;
  usersList.findOneAndUpdate(
    { _id: userId },
    { firstName: reqData.newName },
    (err) => {
      res.json({ message: err });
    }
  );
});

app.listen(3000);
