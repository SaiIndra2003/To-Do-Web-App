const express = require("express")
const List = require("../Schema/ListSchema");

const Router = express.Router();

Router.get("/",function(req,res){
    List.find({status: "Pending"},function(err,PendingTasks){
      if(!err){
        res.render("pending",{Tasks: PendingTasks});
      }
      else{
        console.log(err);
        res.redirect("/");
      }
    });
  
});

Router.delete("/", function(req, res) {
    const checkdeListId = req.body.checkbox;
      List.findByIdAndRemove(checkdeListId, function(err) {
        if (!err) {
          console.log("Removed Succesfully");
          res.redirect("/pending");
        }
      });
});
  
Router.patch("/",function(req,res){
    const Listid = req.body.id;
    List.findByIdAndUpdate(Listid,{status: "Completed"},function(err){
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

module.exports = Router;