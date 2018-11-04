var express = require("express"); // call expresss to be used by application
var app = express();
var mysql = require('mysql');// allow access to sql
var bodyParser = require('body-parser');

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
app.use(bodyParser.urlencoded({ extended: true }));

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

    let sql = 'select * FROM danceclassusers ; '
    let query = db.query(sql, (err, res1) => {
        if (err) throw err;
        console.log(res1);

        res.render('students', { root: VIEWS, res1 });
    });
    console.log('now you are on students');
});

app.get('/class/:id', function(req, res) { 

    let sql = 'SELECT * FROM classes WHERE classId = "' + req.params.id + '"; '
    let query = db.query(sql, (err, res1) => {
        if (err) throw (err);
        res.render('class', { root: VIEWS, res1 });

    });
   
    console.log("Now you are on the class page!");
});

app.get('/student/:id', function(req, res) { 

    let sql = 'SELECT * FROM danceclassusers WHERE userId = "' + req.params.id + '"; '
    let query = db.query(sql, (err, res1) => {
        if (err) throw (err);
        res.render('student', { root: VIEWS, res1 });

    });
   
    console.log("Now you are on the student page!");
});


//register page
app.get('/register', function(req, res) {
    
        // res.sendFile('index.html', {root: VIEWS},behaviour);
        res.render('register', { root: VIEWS });
        console.log('now you ready to register');

});
//--------------------- CREATE TABLES
// app.get('/createuserrolestable', function(req, res) {
//     let sql = 'CREATE TABLE userRoles (userRolesId int NOT NULL AUTO_INCREMENT PRIMARY KEY, userRolesName varchar(255));'
//     let query = db.query(sql, (err, res) => {
//         if (err) throw err;
//     });
// });

// app.get('/createuserstable', function(req, res) {
//     let sql = 'CREATE TABLE danceclassusers (userId int NOT NULL AUTO_INCREMENT PRIMARY KEY, userFirstName varchar(255), userLastName varchar(255), userDateJoined date,  userComments varchar(255),userEmail varchar(50), userPassword varchar(12),userRolesId int,userActive boolean,FOREIGN KEY (userRolesId) REFERENCES userRoles(userRolesId));'
//     let query = db.query(sql, (err, res) => {
//         if (err) throw err;
//     });
// });

// app.get('/createclassestable', function(req, res) {

//     let sql = 'CREATE TABLE classes (classId int NOT NULL AUTO_INCREMENT PRIMARY KEY, className varchar(255), classDate date, classVenue varchar(255), classTime varchar (255), classPrice int(255), classComments varchar(255), Link varchar(255));'
//     let query = db.query(sql, (err, res) => {
//         if (err) throw err;
//     });
//     res.send("table created");
// });

// app.get('/createcarttable', function(req, res) {

//     let sql = 'CREATE TABLE cart (cartId int NOT NULL AUTO_INCREMENT PRIMARY KEY, cartDate date, cartStatus varchar(255), cartTotal int(255), cartUserId int (255),FOREIGN KEY (cartUserId) REFERENCES danceclassusers(userId));'
//     let query = db.query(sql, (err, res) => {
//         if (err) throw err;
//     });
//     res.send("table created");
// });


// app.get('/createcartclasstable', function(req, res) {

//     let sql = 'CREATE TABLE cartClass (cartId int, classId int,PRIMARY KEY (cartId, classId), FOREIGN KEY (cartId) REFERENCES cart(cartId),FOREIGN KEY (classId) REFERENCES classes(classId));'

//     let query = db.query(sql, (err, res) => {
//         if (err) throw err;
//     });
//     res.send("table created");
// });
// app.get('/createuserclasstable', function(req, res) {

//     let sql = 'CREATE TABLE userClass (userId int, classId int,PRIMARY KEY (userId, classId), FOREIGN KEY (userId) REFERENCES danceclassusers(userId),FOREIGN KEY (classId) REFERENCES class(classId));'

//     let query = db.query(sql, (err, res) => {
//         if (err) throw err;
//     });
// });
// app.get('/createstepfamilytable', function(req, res) {

//     let sql = 'CREATE TABLE stepFamily (stepFamilyId int NOT NULL AUTO_INCREMENT PRIMARY KEY, stepFamilyName varchar(255));'
//     let query = db.query(sql, (err, res) => {
//         if (err) throw err;
//     });
// });
// app.get('/createstepcategorytable', function(req, res) {

//     let sql = 'CREATE TABLE stepCategory (stepCategoryId int NOT NULL AUTO_INCREMENT PRIMARY KEY, stepCategoryName varchar(255));'

//     let query = db.query(sql, (err, res) => {
//         if (err) throw err;
//     });
// });
// app.get('/createstepzillpatterntable', function(req, res) {

//     let sql = 'CREATE TABLE stepZillPattern (stepZillPatternId int NOT NULL AUTO_INCREMENT PRIMARY KEY, stepZillPatternName varchar(255));'
//     let query = db.query(sql, (err, res) => {
//         if (err) throw err;
//     });
// });

// app.get('/createsteptable', function(req, res) {

//     let sql = 'CREATE TABLE step (stepId int NOT NULL AUTO_INCREMENT PRIMARY KEY, stepName varchar(255), stepFamilyId varchar(255), stepCategoryId varchar(255),  stepZillPatternId varchar(255),  stepComments varchar(255), stepLink varchar(255),FOREIGN KEY (stepFamilyId) REFERENCES stepFamily(stepFamilyId),FOREIGN KEY (stepCategoryId) REFERENCES stepCategory(stepCategoryId),FOREIGN KEY (stepZillPatternId) REFERENCES stepZillPattern(stepZillPatternId));'

//     let query = db.query(sql, (err, res) => {
//         if (err) throw err;

//     });
// });

// app.get('/createclasssteptable', function(req, res) {

//     let sql = 'CREATE TABLE classStep (classId int, stepId int,PRIMARY KEY ( classId,stepId), FOREIGN KEY (classId) REFERENCES classes(classId),FOREIGN KEY (stepId) REFERENCES step(stepId));'

//     let query = db.query(sql, (err, res) => {
//         if (err) throw err;
//     });
// });

app.get('/createtable', function(req, res) {

    let sql = ''


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
});
//------------------ CRUD

//------------------- CLASS

//createclass page
app.get('/createclass', function(req, res) {
    
        // res.sendFile('index.html', {root: VIEWS},behaviour);
        res.render('createclass', { root: VIEWS });
        console.log('now you ready to create a class');

});

//add entry to class table on post on button press
app.post('/createclass', function(req, res) {
    let sql = 'INSERT INTO classes (className,classDate,classVenue,classTime,classPrice,classComments,Link) VALUES ("' + req.body.name + '","' + req.body.date + '","' + req.body.venue + '","' + req.body.time + '","' + req.body.price + '","' + req.body.comments + '","' + req.body.link + '");'
    
    let query = db.query(sql, (err, res) => {

        if (err) throw err;
    });

    res.render('classes', { root: VIEWS });

});

app.get('/editclass/:id', function(req, res) {
    let sql = 'SELECT * FROM classes WHERE classId = "' + req.params.id + '"; '
    let query = db.query(sql, (err, res1) => {
        if (err) throw (err);
        res.render('editclass', { root: VIEWS, res1 });
    });
});

app.post('/editclass/:id', function(req, res) {

        let sql = 'UPDATE classes SET className= "' + req.body.newname + '" , classDate = "' + req.body.newdate + '", classVenue = "' + req.body.newvenue + '", classTime = "' + req.body.newtime + '",classPrice = "' + req.body.newprice + '", classComments = "' + req.body.newcomments + '", Link = "' + req.body.newlink + '" WHERE Id = "' + req.params.id + '" ;'

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

//--------------------------USER

//createuser page
app.get('/createstudent', function(req, res) {

        res.render('createstudent', { root: VIEWS });
        console.log('now you ready to create a student');

});

//add entry to users table on post on button press
app.post('/createstudent', function(req, res) {

    let sql = 'INSERT INTO danceclassusers (userFirstName,userLastName,userDateJoined,userComments,userEmail,userPassword,userRole,userActive) VALUES ("' + req.body.firstname + '","' + req.body.lastname + '","' + req.body.datejoined + '","' + req.body.comments + '","' + req.body.email + '","' + req.body.password + '","' + req.body.role +  '","' + req.body.active + '");'
    let query = db.query(sql, (err, res) => {
        if (err) throw err;

    });
    res.render('students', { root: VIEWS });

});

//edit data of  muscle table entry on post on button press
app.get('/editstudent/:id', function(req, res) {
    let sql = 'SELECT * FROM danceclassusers WHERE userId = "' + req.params.id + '"; '
    let query = db.query(sql, (err, res1) => {
        if (err) throw (err);
        res.render('editstudent', { root: VIEWS, res1 });
    });
});

app.post('/editstudent/:id', function(req, res) {

        let sql = 'UPDATE danceclassusers SET userFirstName= "' + req.body.newfirstname + '" , userLastName = "' + req.body.newlastname + '", userDateJoined = "' + req.body.newdatejoined + '", userComments = "' + req.body.newcomments + '", userEmail = "' + req.body.newemail + '", userPassword = "' + req.body.newpassword + '", userRole = "' + req.body.newrole + '", userActive = "'+ req.body.newactive +'" WHERE userId = "' + req.params.id + '" ;'

        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            console.log(res1);
        });
        res.redirect(/student/ + req.params.id);

});


app.get('/deletestudent/:id', function(req, res) {
    
        let sql = 'DELETE FROM danceclassusers WHERE userId = "' + req.params.id + '"; '
        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            res.redirect('/students');
        });

});





//add entry to userroles table on post on button press
app.post('/createuserrole', function(req, res) {

    let sql = 'INSERT INTO userRoles (userRolesId,userRolesName) VALUES ("' + req.body.rolesid + '","' + req.body.rolesname + '");'
    let query = db.query(sql, (err, res) => {
        if (err) throw err;

    });
    res.render('index', { root: VIEWS });

});

//edit data of  muscle table entry on post on button press
app.get('/edituserroles/:id', function(req, res) {
    let sql = 'SELECT * FROM userRoles WHERE userId = "' + req.params.id + '"; '
    let query = db.query(sql, (err, res1) => {
        if (err) throw (err);
        res.render('edituser', { root: VIEWS, res1 });
    });
});

app.post('/edituserroles/:id', function(req, res) {

        let sql = 'UPDATE userRoles SET userRolesId = "' + req.body.newuserroleid + '" , userRolesName = "' + req.body.newuserrolename + '" ;'
        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            console.log(res1);
        });
        res.redirect(/userroles/ + req.params.id);

});


app.get('/deleteuserroles/:id', function(req, res) {
    
        let sql = 'DELETE FROM userRoles WHERE Id = "' + req.params.id + '"; '
        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            res.redirect('/userroles');
        });

});


//add entry to userroles table on post on button press
app.post('/creatcart', function(req, res) {

    let sql = 'INSERT INTO cart (cartDate,cartStatus,cartTotal,cartUserId) VALUES ("' + req.body.cartdate + '","' + req.body.cartstatus + req.body.carttotal + '","' + req.body.cartuserid +'");'

    let query = db.query(sql, (err, res) => {
        if (err) throw err;
    });

    res.render('index', { root: VIEWS });
});

//edit data of  muscle table entry on post on button press
app.get('/editcart/:id', function(req, res) {
    let sql = 'SELECT * FROM cart WHERE cartId = "' + req.params.id + '"; '
    let query = db.query(sql, (err, res1) => {
        if (err) throw (err);
        res.render('editcart', { root: VIEWS, res1 });
    });
});

app.post('/editcart/:id', function(req, res) {

        let sql = 'UPDATE cart SET cartDate = "' + req.body.newcartdate + '" , cartStatus = "' + req.body.newcartstatus +'" , cartTotal = "' + req.body.newcarttotal + '" , cartUserId = "' + req.body.newcartuserid +'" ;'

        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            console.log(res1);
        });
        res.redirect(/userroles/ + req.params.id);

});


app.get('/deletecart/:id', function(req, res) {
    
        let sql = 'DELETE FROM cart WHERE cartId = "' + req.params.id + '"; '
        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            res.redirect('/index');
        });

});




//add entry to userroles table on post on button press
app.post('/createstepfamily', function(req, res) {

    let sql = 'INSERT INTO stepFamily (stepFamilyId,stepFamilyName) VALUES ("' + req.body.stepfamilyid + '","' + req.body.stepfamilyname +'");'
    let query = db.query(sql, (err, res) => {
        if (err) throw err;

    });

    res.render('index', { root: VIEWS });
});

//edit data of  muscle table entry on post on button press
app.get('/editstepfamily/:id', function(req, res) {
    let sql = 'SELECT * FROM stepFamily WHERE Id = "' + req.params.id + '"; '
    let query = db.query(sql, (err, res1) => {
        if (err) throw (err);
        res.render('stepfamilies', { root: VIEWS, res1 });
    });
});

app.post('/editstepfamily/:id', function(req, res) {

        let sql = 'UPDATE stepFamily SET stepFamilyId = "' + req.body.newfamilyid + '" , stepFamilyName = "' + req.body.newstepfamilyname +'" ;'

        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            console.log(res1);
        });
        res.redirect(/stepfamilies/ + req.params.id);

});


app.get('/deletestepfamily/:id', function(req, res) {
    
        let sql = 'DELETE FROM stepFamily WHERE Id = "' + req.params.id + '"; '
        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            res.redirect('/stepfamilies');
        });

});

//add entry to stepCategory table on post on button press
app.post('/createstepcategory', function(req, res) {

    let sql = 'INSERT INTO stepCategory (stepCategoryId,stepCategoryName) VALUES ("' + req.body.stepcategoryid + '","' + req.body.stepcategoryname +'");'

    let query = db.query(sql, (err, res) => {
        if (err) throw err;

    });

    res.render('stepcategories', { root: VIEWS });

});

//edit data of  stepcategory table entry on post on button press
app.get('/editstepcategory/:id', function(req, res) {
    let sql = 'SELECT * FROM stepCategory WHERE Id = "' + req.params.id + '"; '
    let query = db.query(sql, (err, res1) => {
        if (err) throw (err);
        res.render('stepcategories', { root: VIEWS, res1 });
    });
});

app.post('/editstepcategory/:id', function(req, res) {

        let sql = 'UPDATE stepCategory SET stepCategoryId = "' + req.body.newcategoryid + '" , stepCategoryName = "' + req.body.newstepcategoryname +'" ;'

        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            console.log(res1);
        });
        res.redirect(/stepcategories/ + req.params.id);

});


app.get('/deletestepcategory/:id', function(req, res) {
    
        let sql = 'DELETE FROM stepCategory WHERE Id = "' + req.params.id + '"; '
        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            res.redirect('/stepcategories');
        });

});


//add entry to userroles table on post on button press
app.post('/createstepzillpattern', function(req, res) {

    let sql = 'INSERT INTO stepZillPattern (stepZillPatterId,stepZillPatterName) VALUES ("' + req.body.stepzillpatternid + '","' + req.body.stepzillpatternname +'");'

    let query = db.query(sql, (err, res) => {
        if (err) throw err;

    });

    res.render('stepzillpatterns', { root: VIEWS });
});

//edit data of  muscle table entry on post on button press
app.get('/editstepzillpattern/:id', function(req, res) {
    let sql = 'SELECT * FROM stepZillPattern WHERE Id = "' + req.params.id + '"; '
    let query = db.query(sql, (err, res1) => {
        if (err) throw (err);
        res.render('stepzillpatterns', { root: VIEWS, res1 });
    });
});

app.post('/editstepcategory/:id', function(req, res) {

        let sql = 'UPDATE stepZillPattern SET stepZillPatternId = "' + req.body.newstepzillid + '" , stepZillPatternName = "' + req.body.newstepzillname +'" ;'

        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            console.log(res1);
        });
        res.redirect(/stepzillpatterns/ + req.params.id);

});


app.get('/deletestepzillpattern/:id', function(req, res) {
    
        let sql = 'DELETE FROM stepZillPattern WHERE Id = "' + req.params.id + '"; '
        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            res.redirect('/stepzillpatterns');
        });

});
//add entry to users table on post on button press
app.post('/createstep', function(req, res) {

    let sql = 'INSERT INTO step (stepName,stepFamilyId,stepCategoryId,stepZillPatternId,stepComments,stepLink) VALUES ("' + req.body.stepname + '","' + req.body.stepfamilyid + '","' + req.body.stepcategoryid + '","' + req.body.stepzillpatternid + '","' + req.body.stepcomments + '","' + req.body.steplink + '");'

    let query = db.query(sql, (err, res) => {
        if (err) throw err;

    });

    res.render('steps', { root: VIEWS });
});

//edit data of  muscle table entry on post on button press
app.get('/editstep/:id', function(req, res) {
    let sql = 'SELECT * FROM steps WHERE Id = "' + req.params.id + '"; '
    let query = db.query(sql, (err, res1) => {
        if (err) throw (err);
        res.render('edituser', { root: VIEWS, res1 });
    });
});

app.post('/editstep/:id', function(req, res) {

        let sql = 'UPDATE step SET stepName= "' + req.body.newstepname + '" , stepFamilyId = "' + req.body.newfamilyid + '", stepCategoryId = "' + req.body.newcategoryid + '", stepZillPatternId = "' + req.body.newzillpatternid + '", stepComments = "' + req.body.newstepcomments + '", stepLink = "' + req.body.newsteplink + '" ;'

        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            console.log(res1);
        });
        res.redirect(/steps/ + req.params.id);

});


app.get('/deletestep/:id', function(req, res) {
    
        let sql = 'DELETE FROM step WHERE Id = "' + req.params.id + '"; '
        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            res.redirect('/steps');
        });

});

//set up the environment for the app to run
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
    console.log("app is running");
});