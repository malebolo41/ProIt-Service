const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/dateDB");

const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  username:{
    type: String,
    required: true
  },
  password: String,
  email: String,
  address1: String,
  address2: String
});


const User = new mongoose.model("User", userSchema);


app.get("/",(req,res)=>{
res.render("login");
});


app.get("/register",(req,res)=>{
res.render("register");
});





app.post("/register", (req,res)=>{

  const usuario = new User({
    name: req.body.firstName,
    lastname: req.body.firstName,
    username: req.body.username,
    password: req.body.pass1,
    email: req.body.email,
    address1: req.body.dir1,
    address2: req.body.dir2,
  });

  usuario.save();

 res.redirect("/")


});




app.post("/",(req,res)=>{

 User.findOne({username: req.body.user, password: req.body.pass}, (err, result)=>{

   if(result !== null){
      res.redirect("/");
   } else{
     console.log("User or Password is wrong...");
   }

 });

});



app.listen("3000",()=>{
console.log("Server started on port 3000");
});
