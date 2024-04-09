const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require("cors");

app.use(cors());
app.use(express.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234asdf",
  database: "STDB"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
    // UPDATE Students SET CodeA = 1 WHERE Code >= 3 UPDATE Students SET CodeA = 2 WHERE Code > 3
    // con.query("CREATE Table Marks (Code int, CodeA int, CodeL int, Mark Decimal(7,2))", function (err, result) { });
    // con.query("UPDATE Students SET CodeA = 1 WHERE Code = 3", function (err, result) { 
    //   if (err) throw err;
    //   console.log("updated");
    // });
});

app.post('/Cls', (req, res) => {
  con.query("SELECT * FROM Classes", function (err, result) { res.send(result); });
});

app.post('/Nms', (req, res) => {
  var cd = req.body.cls;
  con.query("SELECT * FROM Students WHERE CodeA =" + cd, function (err, result) { res.send(result); });
});

app.post('/Fnd', (req, res) => {
  var cd = req.body.cd;
  var cdA = req.body.cdA;
  con.query("SELECT * FROM Students WHERE Code =" + cd + " AND CodeA=" + cdA,
  function (err, result) { res.send(result); });
});


app.post('/UpDt', (req, res) => {
  var cd = req.body.cd;
  var ner = req.body.ner;
  var ads = req.body.ads;
  var cdA = req.body.cdA;
  con.query("UPDATE Students SET Name='" + ner + "', Address='" + ads + "' WHERE Code =" + cd + "AND CodeA =" + cdA,
  function (err, result) { res.send(result); });
});

app.post('/Ins', (req, res) => {
  var cd = req.body.cd;
  var ner = req.body.ner;
  var ads = req.body.ads;
  var cdA = req.body.cdA;
  con.query("INSERT INTO Students (Code, Name, Address, CodeA)" +
  " VALUES (" + cd + " , '" + ner + "' , '" + ads + "' , " + cdA + ")" ,
  function (err, result) { res.send(result); });
});

app.listen("8822", () => {
   console.log("Port 8822")
})

    // con.query("SELECT * FROM Students", function (err, res) { console.log(res); });
    // var sql = "INSERT INTO Students VALUES ?";
    // var values = [[ 2, 'John', 'Highway 71', 1], 
    //   [3, 'Peter', 'Lowstreet 4', 1],
    //   [4, 'Amy', 'Apple st 652', 2],
    //   [5, 'Hannah', 'Mountain 21', 2]];
    // con.query(sql, [values], function (err, result) { console.log(result); })
    
// var mysql = require('mysql2');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1234asdf",
//   database: "STDB"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("SELECT * FROM Students", function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

//last version

// var mysql = require('mysql2');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1234asdf",
//   database: "STDB"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM Classes", function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
// });