var express = require("express"); // call expresss to be used by application
var app = express();
var passport = require("passport")
var mysql = require('mysql');// allow access to sql

// module.exports = function(){

// const db = mysql.createConnection({
//     host: 'isabellebidou.com',
//     user: '******',
//     password: '******!',
//     database: 'isabelle_db',
//     port: 3306
// });
// }

// module.exports = function(options) {
//     var options = {
//     host: 'isabellebidou.com',
//     user: '******',
//     password: '******',
//     database: 'isabelle_db',
//     port: 3306
// };
// }