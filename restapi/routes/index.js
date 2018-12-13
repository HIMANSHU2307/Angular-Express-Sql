const express = require('express');
const router = express.Router();
const sql = require('mssql');
// const tabletojson = require('tabletojson');

/* db configuration */
const config = {
  user: 'sa',
  password: 'a1212',
  database: 'NodeJsDb',
  server: '192.168.27.5'
};

/*var sqlConnection = new sql.ConnectionPool({
  user: 'sa',
  password: 'a1212',
  database: 'NodeJsDb',
  server: 'RSPLPC2\\SQLEXPRESS'
});*/

// sqlConnection.connect();

/* GET home page. */
router.get('/gettable', function(req, res, next) {
  GetData(function(recordset){
    let products = recordset;
    //console.log(recordset);

    res.send(recordset);
    console.log("got the data");
  });
});

router.post('/addproduct', function(req, res, next) {
  var connection = new sql.ConnectionPool(config, (err) =>
    {
    var request = new sql.Request(connection);
    request.query("INSERT INTO Product (ProductName, ProductDescription) VALUES ('"+req.body.ProductName+"', '" + req.body.ProductDescription +"')", (err, record) => {  
      if (req) {
        connection.close();
        console.log(connection);
      }   
    }); 
    //console.log(connection);
    GetData(function(recordset){
      //let products = recordset;
      //console.log(recordset);
      res.send(recordset);
      console.log("got the data");
    });
  });
     
  });

router.delete('/gettable/:id', function (req, res) {
  var connection = new sql.ConnectionPool(config, (err) =>
  {
    var request = new sql.Request(connection);
    request.query("DELETE FROM Product WHERE ProductID = "+req.params.id+"", (err, record) => {  
      console.log(req.params.id);  
      /*if (req.params.id) {
        connection.close();
        //console.log(connection);
      }*/
    }); 
    GetData(function(recordset){
      //let products = recordset;
      //console.log(recordset);
      res.send(recordset);
      console.log("got the data");
    });
  });
});

function GetData(callback) {
  
  var connection = new sql.ConnectionPool(config, (err) =>
  { 
    var request = new sql.Request(connection);
    request.query('SELECT * FROM Product', (err, recordset) => {
       if (recordset) {
         connection.close();
         //console.log(connection);
       }
       callback(recordset);
       console.log(recordset);
       //console.log(connection);
    });
    
  });
}

module.exports = router;