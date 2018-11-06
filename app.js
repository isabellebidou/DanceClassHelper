var express = require("express"); // call expresss to be used by application
var app = express();
var mysql = require('mysql');// allow access to sql
var bodyParser = require('body-parser');
var fs = require("fs");
var behaviour = require('./behaviour.js');
const path = require('path');
const VIEWS = path.join(__dirname, 'views');
app.use(express.static("scripts"));
app.use(express.static("images"));
//app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.set('view engine', 'jade');
const db = mysql.createConnection({
    host: 'isabellebidou.com',
    user: 'isabelle_1',
    password: 'Realt18',
    database: 'isabelle_db',
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
var steps = require("./models/steps.json");
app.use(bodyParser.urlencoded({ extended: true }));

//passport    http://www.passportjs.org/docs/username-password/
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;



//var flash = require('flash');
app.use(passport.initialize());
app.use(passport.session());
//app.use(flash());
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
//home page
app.get('/', function(req, res) {
    res.render('index', { root: VIEWS });
    console.log('now you are home');
    
});
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//app.post('/register', passport.authenticate('local-signup'), userResponse);

//app.post('/login', passport.authenticate('local-login'), userResponse);

app.get('/logout', (req, res)=>{
req.logout();
return res.json({status:'success'});
});

//passport routes
app.get('/login',
  function(req, res){
    res.render('login', { root: VIEWS });
    console.log('now you are on the login page');
  });
  
app.post('/login', 
  passport.authenticate('local-login', { failureRedirect: '/login' }),
  function(req, res) {

      console.log(req.user.userRole);
    //res.redirect('/');
    res.render('index', { root: VIEWS, req });
  });
  
app.post('/register', 
  passport.authenticate('local-signup', { failureRedirect: '/register' }),
   
  function(req, res) {
      console.log("register -local-signup");
    res.redirect('/');
  });
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
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

//step page
app.get('/step', function(req, res) {
    
        
        res.render('step', { root: VIEWS });
        console.log('checking a step');

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

    res.redirect('/classes');

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
app.post('/createstudent', function(req, res1) {

    let sql = 'INSERT INTO danceclassusers (userFirstName,userLastName,userDateJoined,userComments,userEmail,userPassword,userRole,userActive) VALUES ("' + req.body.firstname + '","' + req.body.lastname + '","' + req.body.datejoined + '","' + req.body.comments + '","' + req.body.email + '","' + req.body.password + '","' + req.body.role +  '","' + req.body.active + '");'
    let query = db.query(sql, (err, res) => {
        if (err) throw err;

    });
    //res1.render('students', { root: VIEWS });
    res1.redirect('/students');
   

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

app.get('/step/:id', function(req, res) { 
    
    var indOne = null;

function choosestep(indOne) {
    
        return indOne.index === parseInt(req.params.id);
    }

    console.log("id or step= " + req.params.id);
    indOne = steps.filter(choosestep);
    console.log(indOne);

    
  
//    var embedUrl = behaviour.makeEmbedUrl(indOne[0].url, indOne[0].id);
//    console.log("app.get: "+embedUrl);

    res.render('step', { indOne:indOne});
});

app.get('/queryme', function(req,res){
    let sql = 'SELECT * FROM classes';
    let query = db.query(
        sql,(err,res) =>{
            if(err) throw err;
            console.log(res);
        });
        res.send("message in the console");

});


//----------------------------------
//-------------------------------------json manipulation: STEPS
app.get('/addstep', function(req, res) {

   // if (req.session.email == "LoggedIn") {
        // res.sendFile('index.html', {root: VIEWS},behaviour);
        res.render('addstep', { root: VIEWS });
        console.log('now you see th steps');
    // }
    // else {
    //     res.redirect('/login');
    // }
});

app.get("/steps", function(req, res) {

    res.render("steps", { steps: steps });
    console.log("steps");
});

app.post('/addstep', function(req, res) {
    var count = Object.keys(steps).length; // Tells us how many products we have its not needed but is nice to show how we can do this
    console.log(count);

    // This will look for the current largest id in the steps JSON file this is only needed if you want the steps to have an auto ID which is a good idea 

    function getMax(steps, id) {
        var max
        for (var i = 0; i < steps.length; i++) {
            if (!max || parseInt(steps[i][id]) > parseInt(max[id]))
                max = steps[i];

        }
        return max;
    }

    var maxPpg = getMax(steps, "id"); // This calls the function above and passes the result as a variable called maxPpg.
    console.log(maxPpg);
    var newId = maxPpg.id + 1; // this creates a nwe variable called newID which is the max Id + 1
    console.log(newId); // We console log the new id for show reasons only

    // create a new product based on what we have in our form on the add page 

    var step = {
        step: req.body.step, // name called from the add.jade page textbox

        answer: req.body.answer, // content called from the add.jade page textbox
        id: newId, // this is the variable created above

    };
    console.log(step) // Console log the new product 
    var json = JSON.stringify(steps); // Convert from object to string

    // The following function reads the json file then pushes the data from the variable above to the steps JSON file. 
    fs.readFile('./models/steps.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            throw (err);
        }
        else {
            steps.push(step); // add the information from the above variable
            json = JSON.stringify(steps, null, 4); // converted back to JSON the 4 spaces the json file out so when we look at it it is easily read. So it indents it. 
            fs.writeFile('./models/steps.json', json, 'utf8'); // Write the file back

        }
    });
    res.redirect("/steps")
});;









app.get('/editstep/:id', function(req, res) {

    function choosestep(indOne) {
        return indOne.id === parseInt(req.params.id)
    }



    console.log("id or step= " + req.params.id);
    console.log("editstep");
    var indOne = steps.filter(choosestep);

    res.render('editstep', { indOne: indOne });
});


//post request to edit the individual step
app.post('/editstep/:id', function(req, res) {

    var x = req.body.newstep;
    var y = req.body.newanswer;
    var z = parseInt(req.params.id);

    steps.splice(z - 1, 1, { step: x, answer: y, id: z });
    var json = JSON.stringify(steps, null, 4);

    fs.writeFile('./models/steps.json', json, 'utf8');
    res.redirect("/quiz");

});

app.get("/deletestep/:id", function(req, res) {
    if (req.session.email == "LoggedIn") {
        var z = parseInt(req.params.id);
        steps.splice(z - 1, 1);
        var json = JSON.stringify(steps, null, 4);
        recalibrate();
        fs.writeFile('./models/steps.json', json, 'utf8');

        res.redirect("/steps");
    }
    else {
        res.redirect('/login');
    }

});
// this is used after you delete a step to keep numbers in order
function recalibrate() {

    var x = 0;
    for (x; x < steps.length; x++) {
        steps[x].id = x + 1;

    }
    var json = JSON.stringify(steps, null, 4);
    fs.writeFile('./models/steps.json', json, 'utf8');
}

// End JSON
//end of json manipulation

////////--------------Passport
// expose this function to our app using module.exports









//set up the environment for the app to run
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
    console.log("app is running");
});