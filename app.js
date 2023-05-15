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






app.get("/completed",function(req,res){
  Item.find({status: "Completed"},function(err,CompletedTasks){
    if(!err){
      res.render("completed",{Tasks: CompletedTasks});
    }
    else{
      console.log(err);
      res.redirect("/");
    }
  });
})

app.delete("/completed/delete", function(req, res) {
  const checkdeItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkdeItemId, function(err) {
      if (!err) {
        console.log("Removed Succesfully");
        res.redirect("/completed");
      }
    });
});
app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
