//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const methodOverride = require('method-override');

const MainRoute = require("./Routes/Main");



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(express.static("public"));
app.set('view engine', 'ejs'); 

mongoose.connect("mongodb://localhost:27017/todoListDB");

app.use("/",MainRoute);

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
