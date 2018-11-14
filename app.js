var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({"extended":true}));
app.set("view engine", "ejs");


app.get("/", function(req, res) {
    res.render("home");
});

app.get("/movieResult", function(req,res){
   var searchTitle = req.query.searchTitle;
   console.log(searchTitle);
   var requestApiURL = "http://www.omdbapi.com/?s=" + searchTitle + "&apikey=thewdb"
   request(requestApiURL, function(error, response, body){
       if(!error && response.statusCode == 200) {
         var parsedResults = JSON.parse(body); 
         console.log(body);
         console.log(parsedResults);
         res.render("results", parsedResults);
       }
   });
  
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Started Movies Database Server");
});