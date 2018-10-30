var express = require("express"); // call expresss to be used by application
var app = express();

const path = require('path');
const VIEWS = path.join(__dirname, 'views');
app.get('/', function(req,res){
   // res.send("hello cruel world!");
   res.sendFile('index.html', {root: VIEWS});
    console.log("you are home");
    
});
//set up the environment for the app to run
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
    console.log("app is running");
})