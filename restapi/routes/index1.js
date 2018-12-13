//Initiallising node modules
var express = require("express");
const router = express.Router();
//var bodyParser = require("body-parser");
var sql = require("mssql");
// var app = express(); 

// Body Parser Middleware
// app.use(bodyParser.json()); 

//CORS Middleware
/*app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});*/

//Setting up server
/* var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });*/

//Initiallising connection string
var dbConfig = {
    user: 'sa',
    password: 'a1212',
    database: 'NodeJsDb',
    server: 'RSPLPC2\\SQLEXPRESS'
  };

//Function to connect to database and execute query
var  executeQuery = function(res, query){             
     sql.connect(dbConfig, function (err) {
         if (err) {   
                     console.log("Error while connecting database :- " + err);
                     res.send(err);
                  }
                  else {
                         // create Request object
                         var request = new sql.Request();
                         // query to the database
                         request.query(query, function (err, res) {
                           if (err) {
                                      console.log("Error while querying database :- " + err);
                                      res.send(err);
                                     }
                                     else {
                                       res.send(res);
                                            }
                               });
                       }
      });           
}

//GET API
router.get("/gettable", function(req , res){
                console.log('hiiiiiiiiiiiiiiiiiiiii');
                var query = "select * from Product";
                executeQuery (res, query);
});

//POST API
 router.post("/addproduct", function(req , res){
                var query = "INSERT INTO Product (ProductName, ProductDescription) VALUES ('res.ProductName', 'res.ProductDescription')";
                executeQuery (res, query);
});

//PUT API
 router.put("/api/user", function(req , res){
                var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
                executeQuery (res, query);
});

// DELETE API
 router.delete("/api/user /:id", function(req , res){
                var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
                executeQuery (res, query);
});

