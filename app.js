//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const methodOverride = require('method-override');

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todoListDB");

const MainRoute = require("./Routes/Main");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(express.static("public"));
app.set('view engine', 'ejs'); 


app.use("/",MainRoute);

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
