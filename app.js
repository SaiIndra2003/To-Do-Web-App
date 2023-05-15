//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const methodOverride = require('method-override');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(express.static("public"));
app.set('view engine', 'ejs'); 
mongoose.connect("mongodb://localhost:27017/todoListDB");

const itemsSchema = mongoose.Schema({
  item: String,
  status: { type: String, default: "Pending"}
});

const Item = mongoose.model("Item", itemsSchema);


const item1 = new Item({
  item: "Welcome to your to do List!!"
});

const item2 = new Item({
  item: "Hit the + to add a new item."
});

const item3 = new Item({
  item: "<-- Hit this to delete an item."
});

const item4 = new Item({
  item: "Hit this to update the status -->"
});

const defaultItems = [item1, item2, item3, item4];




app.get("/", function(req, res) {
  Item.find({}, function(err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Succesfully saved default items in db");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {
        newListItems: foundItems
      });
    }
  });
});

app.post("/", function(req, res) {
  const itemName = req.body.newItem;
  const item = new Item({
    item: itemName
  });
    item.save();
    res.redirect("/");
});

app.delete("/delete", function(req, res) {
  const checkdeItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkdeItemId, function(err) {
      if (!err) {
        console.log("Removed Succesfully");
        res.redirect("/");
      }
    });
});

app.patch("/complete",function(req,res){
  const Itemid = req.body.id;
  Item.findByIdAndUpdate(Itemid,{status: "Completed"},function(err){
    if(!err){
      console.log("Updated succesfully");
      res.redirect("/");
    }
    else{
      console.log(err);
      res.redirect("/");
    }
  })
});

app.get("/pending",function(req,res){
  Item.find({status: "Pending"},function(err,PendingTasks){
    if(!err){
      res.render("pending",{Tasks: PendingTasks});
    }
    else{
      console.log(err);
      res.redirect("/");
    }
  });

});

app.delete("/pending/delete", function(req, res) {
  const checkdeItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkdeItemId, function(err) {
      if (!err) {
        console.log("Removed Succesfully");
        res.redirect("/pending");
      }
    });
});

app.patch("/pending/complete",function(req,res){
  const Itemid = req.body.id;
  Item.findByIdAndUpdate(Itemid,{status: "Completed"},function(err){
    if(!err){
      console.log("Updated succesfully");
      res.redirect("/pending");
    }
    else{
      console.log(err);
      res.redirect("/");
    }
  })
});

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
