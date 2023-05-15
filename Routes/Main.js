const express = require("express")
const List = require("../Schema/ListSchema")
const PendingListRoute = require("./Pending")
const completeListRoute = require("./Complete")

const Router = express.Router();


const item1 = new List({
    item: "Welcome to your to do List!!"
});
  
const item2 = new List({
    item: "Hit the + to add a new item."
});
  
const item3 = new List({
    item: "<-- Hit this to delete an item."
});
  
const item4 = new List({
    item: "To update the status hit this -->"
});

const defaultItems = [item1, item2, item3, item4];


Router.get("/", function(req, res) {
    List.find({}, function(err, foundItems) {
      if (foundItems.length === 0) {
        List.insertMany(defaultItems, function(err) {
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
  
Router.post("/", function(req, res) {
    const listContent = req.body.newItem;
    const list = new List({
      item: listContent
    });
      list.save();
      res.redirect("/");
});

Router.delete("/", function(req, res) {
    const checkdeListId = req.body.checkbox;
      List.findByIdAndRemove(checkdeListId, function(err) {
        if (!err) {
          console.log("Removed Succesfully");
          res.redirect("/");
        }
      });
});

Router.patch("/",function(req,res){
    const Itemid = req.body.id;
    List.findByIdAndUpdate(Itemid,{status: "Completed"},function(err){
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


Router.use("/pending",PendingListRoute);
Router.use("/completed",completeListRoute);

module.exports = Router;