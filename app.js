var express = require("express"); // call expresss to be used by application
var app = express();
var mysql = require('mysql');// allow access to sql

const path = require('path');
const VIEWS = path.join(__dirname, 'views');
app.use(express.static("scripts"));
app.use(express.static("images"));
app.set('view engine', 'jade');
const db = mysql.createConnection({
    host: ‘********.com',
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

        res.render('classes', { root: VIEWS, res1 });
    });
    console.log('now you are on classes');
});
//students page
app.get('/students', function(req, res) {

    let sql = 'select * FROM danceclassusers INNER JOIN userRoles ON danceclassusers.userRoleId = userRoles.userRolesId WHERE danceclassusers.userRoleId = "student"; '
    let query = db.query(sql, (err, res1) => {
        if (err) throw err;
        console.log(res1);

        res.render('students', { root: VIEWS, res1 });
    });
    console.log('now you are on students');
});

//createclass page
app.get('/createclass', function(req, res) {
    
        // res.sendFile('index.html', {root: VIEWS},behaviour);
        res.render('createclass', { root: VIEWS });
        console.log('now you ready to create a class');

});

//register page
app.get('/register', function(req, res) {
    
        // res.sendFile('index.html', {root: VIEWS},behaviour);
        res.render('register', { root: VIEWS });
        console.log('now you ready to register');

});

app.get('/createuserrolestable', function(req, res) {

    let sql = 'CREATE TABLE userRoles (userRolesId int NOT NULL AUTO_INCREMENT PRIMARY KEY, userRolesName varchar(255));'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
});

app.get('/createuserstable', function(req, res) {

    let sql = 'CREATE TABLE danceclassusers (userId int NOT NULL AUTO_INCREMENT PRIMARY KEY, userFirstName varchar(255), userLastName varchar(255), userDateJoined date,  userComments varchar(255),userEmail varchar(50), userPassword varchar(12),userRole varchar(25),userActive boolean, FOREIGN KEY (userRoleId) REFERENCES userRoles(userRoleId));'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
});

app.get('/createclassestable', function(req, res) {

    let sql = 'CREATE TABLE classes (classId int NOT NULL AUTO_INCREMENT PRIMARY KEY, className varchar(255), classDate date, classVenue varchar(255), classTime varchar (255), classPrice varchar(255), classComments varchar(255), Link varchar(255));'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
});

app.get('/createcarttable', function(req, res) {

    let sql = 'CREATE TABLE cart (cartId int NOT NULL AUTO_INCREMENT PRIMARY KEY, cartDate date, cartStatus varchar(255), userId int (255),FOREIGN KEY (userId) REFERENCES danceclassusers(userId));'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
});
app.get('/createcartclasstable', function(req, res) {

    let sql = 'CREATE TABLE cartClass (cartId int, classId int,PRIMARY KEY (cartId, classId), FOREIGN KEY (cartId) REFERENCES cart(cartId),FOREIGN KEY (classId) REFERENCES classes(classId));'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
});
app.get('/createuserclasstable', function(req, res) {

    let sql = 'CREATE TABLE userClass (userId int, classId int,PRIMARY KEY (userId, classId), FOREIGN KEY (userId) REFERENCES danceclassusers(userId),FOREIGN KEY (classId) REFERENCES class(classId));'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
});
app.get('/createstepfamilytable', function(req, res) {

    let sql = 'CREATE TABLE stepFamily (stepFamilyId int NOT NULL AUTO_INCREMENT PRIMARY KEY, stepFamilyName varchar(255));'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
});
app.get('/createstepcategorytable', function(req, res) {

    let sql = 'CREATE TABLE stepCategory (stepCategoryId int NOT NULL AUTO_INCREMENT PRIMARY KEY, stepCategoryName varchar(255));'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
});
app.get('/createstepzillpatterntable', function(req, res) {

    let sql = 'CREATE TABLE stepZillPattern (stepZillPatternId int NOT NULL AUTO_INCREMENT PRIMARY KEY, stepZillPatternName varchar(255));'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
});

app.get('/createsteptable', function(req, res) {

    let sql = 'CREATE TABLE step (stepId int NOT NULL AUTO_INCREMENT PRIMARY KEY, stepName varchar(255), stepFamilyId varchar(255), stepCategoryId varchar(255),  stepZillPatternId varchar(255),  stepComments varchar(255), stepLink varchar(255),FOREIGN KEY (stepFamilyId) REFERENCES stepFamily(stepFamilyId),FOREIGN KEY (stepCategoryId) REFERENCES stepCategory(stepCategoryId),FOREIGN KEY (stepZillPatternId) REFERENCES stepZillPattern(stepZillPatternId));'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
});
app.get('/createtable', function(req, res) {

    let sql = ''


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
});
app.get('/createclasssteptable', function(req, res) {

    let sql = 'CREATE TABLE classStep (classId int, stepId int,PRIMARY KEY ( classId,stepId), FOREIGN KEY (classId) REFERENCES classes(classId),FOREIGN KEY (stepId) REFERENCES step(stepId));'


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
});