"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const fccTesting = require("./freeCodeCamp/fcctesting.js");
const mongo = require("mongodb").MongoClient;
const app = express();
const routes = require("./routes.js");
const auth = require("./auth.js");

fccTesting(app); //For FCC testing purposes
app.use("/public", express.static(process.cwd() + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");

mongo.connect(process.env.MONGO_URI, (err, client) => {
  let db = client.db("testproject");
  if (err) {
    console.log("Database error: " + err);
  } else {
    console.log("Successful database connection");

    auth(app, db);

    routes(app, db);

    app.listen(process.env.PORT || 3000, () => {
      console.log("Listening on port " + process.env.PORT);
    });
  }
