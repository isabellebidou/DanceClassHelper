var express = require("express"); // call expresss to be used by application
var app = express();
var passport = require("passport")
var mysql = require('mysql');// allow access to sql



const db = mysql.createConnection({
    host: ‘********.com',
    user: ‘******',
    password: ‘******',
    database: ‘******',
    port: 3306
});

module.exports = function(options) {
    var options = {
    host: '*****',
    user: '******',
    password: '*******',
    database: '****',
    port: 3306
};
}