require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const Routes = require("./routes/routes"); //importing the routes so our app actually uses them

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json()); //takes any json data from requests, and parses it into a js code

// view engine
app.set('view engine', 'ejs');

const dbURI = process.env.host
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(80))
  .then(console.log("DATABASE STATUS: CONNECTED"))
  .then(console.log("SERVER STATUS: ONLINE"))
  .catch((err) => console.log(err));

// routes
app.use(Routes);