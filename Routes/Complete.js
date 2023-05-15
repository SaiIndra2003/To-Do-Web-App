const express = require("express");
const List = require("../Schema/ListSchema");

const Router = express.Router();


app.get("/",function(req,res){
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
  
app.delete("/", function(req, res) {
    const checkdeListId = req.body.checkbox;
      List.findByIdAndRemove(checkdeListId, function(err) {
        if (!err) {
          console.log("Removed Succesfully");
          res.redirect("/completed");
        }
      });
});


module.exports = Router;