const express = require("express");
const List = require("../Schema/ListSchema");

const Router = express.Router();


Router.get("/",function(req,res){
    List.find({status: "Completed"},function(err,CompletedTasks){
      if(!err){
        res.render("completed",{Tasks: CompletedTasks});
      }
      else{
        console.log(err);
        res.redirect("/");
      }
    });
})
  
Router.delete("/", function(req, res) {
    const checkdeListId = req.body.checkbox;
      List.findByIdAndRemove(checkdeListId, function(err) {
        if (!err) {
          res.redirect("/completed");
        }
      });
});


module.exports = Router;