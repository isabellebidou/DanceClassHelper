var express = require("express"); // call expresss to be used by application
var app = express();
var mysql = require('mysql');// allow access to sql

const path = require('path');
const VIEWS = path.join(__dirname, 'views');
app.use(express.static("scripts"));
app.use(express.static("images"));
app.set('view engine', 'jade');
const db = mysql.createConnection({
    host: ‘***********',
    user: ‘******',
    password: ‘******',
    database: ‘******',
    port: 3306
});
db.connect((err) => {
    if (err) {

        throw (err)
    }
    else {
        console.log("db connected!");

    }
});


//home page
app.get('/', function(req, res) {
    res.render('index', { root: VIEWS });
    console.log('now you are home');
    
});


//classes page
app.get('/classes', function(req, res) {

    let sql = 'SELECT * FROM classes'
    let query = db.query(sql, (err, res1) => {
        if (err) throw err;
        console.log(res1);

        res.render('classes.jade', { root: VIEWS, res1 });
    });
    console.log('now you are on classes');
});

//createmuscle page
app.get('/createclass', function(req, res) {
    
        // res.sendFile('index.html', {root: VIEWS},behaviour);
        res.render('createclass', { root: VIEWS });
        console.log('now you ready to create a class');

});

app.get('/createstudentstable', function(req, res) {

    let sql = 'CREATE TABLE classes (Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, FName varchar(255), LName varchar(255), DateJoined date,  Price varchar(255), Comments varchar(255), Link varchar(255)) ;'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
});

app.get('/createclassestable', function(req, res) {

    let sql = 'CREATE TABLE classes (Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Date date, Venue varchar(255), Time varchar (255), Price varchar(255), Comments varchar(255), Link varchar(255)) ;'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
});

app.get('/createstudentstable', function(req, res) {

    let sql = 'CREATE TABLE classes (Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Date date, Venue varchar(255), Time varchar (255), Price varchar(255), Comments varchar(255), Link varchar(255)) ;'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
});
//add entry to muscle table on post on button press
app.post('/createclass', function(req, res) {

    let sql = 'INSERT INTO classes (Name,Origin,Insertion,Action,Image,Comments,Link) VALUES ("' + req.body.name + '","' + req.body.origin + '","' + req.body.insertion + '","' + req.body.action + '","' + req.body.image + '","' + req.body.comments + '","' + req.body.link + '");'

    let query = db.query(sql, (err, res) => {
        if (err) throw err;

    });

    res.render('index', { root: VIEWS });



});

//edit data of  muscle table entry on post on button press
app.get('/editclass/:id', function(req, res) {
    let sql = 'SELECT * FROM classes WHERE Id = "' + req.params.id + '"; '
    let query = db.query(sql, (err, res1) => {
        if (err) throw (err);
        res.render('editclass', { root: VIEWS, res1 });
    });
});

app.post('/editclass/:id', function(req, res) {

        let sql = 'UPDATE classes SET Name= "' + req.body.newname + '" , Origin = "' + req.body.neworigin + '", Insertion = "' + req.body.newinsertion + '", Action = "' + req.body.newaction + '",Image = "' + req.body.newimage + '", Comments = "' + req.body.newcomments + '", Link = "' + req.body.newlink + '" WHERE Id = "' + req.params.id + '" ;'

        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            console.log(res1);
        });
        res.redirect(/class/ + req.params.id);

});


app.get('/deleteclass/:id', function(req, res) {
    
        let sql = 'DELETE FROM classes WHERE Id = "' + req.params.id + '"; '
        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            res.redirect('/classes');
        });

});
//set up the environment for the app to run
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
    console.log("app is running");
})