//INSPIRED BY https://gist.github.com/manjeshpv/84446e6aa5b3689e8b84

// config/passport.js

// load all the things we need

var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;


var mysql = require('mysql');

const db = mysql.createConnection({
    host: ‘********.com',
    user: ‘******',
    password: ‘******',
    database: ‘******',
    port: 3306
});



module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

//     // used to serialize the user for the session
//     passport.serializeUser(function(user, done) {
// 		done(null, user.id);
//     });

//     // used to deserialize the user
//     passport.deserializeUser(function(id, done) {
// 		let query = db.query("select * from danceclassusers where userId = "+id,function(err,rows){
// 			done(err, rows[0]);
// 		});
//     });



    
    
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(id, done) {

    
    db.query("select * from danceclassusers where id = "+id,function(err,rows){	
			done(err, rows[0]);
		});

});
    
     	// =========================================================================
    // LOCAL Self_SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    //are there other options?
    //emailField did not seem to do anything
    passReqToCallback: true
},
    function(req, email, password, done) {
    console.log("local-register");
		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
        let query = db.query("SELECT * FROM danceclassusers where userEmail = '"+email+"'",function(err,rows){
			console.log(rows);
			
			console.log("req.body.firstname: "+req.body.firstname);
			if (err){
			    console.log(err);
                return done(err);
			
			    
			}
			    
			 if (rows.length) {
			     console.log("email is already taken");
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                console.log("else");
				// if there is no user with that email
                // create the user
                var newUserMysql = new Object();
                console.log("new object");
                console.log("email :"+ email);
				newUserMysql.email    = email;
                newUserMysql.password = password; // use the generateHash function in our user model
                
                var datejoined = new Date().getDate();
                var active = "inactive";
                var role= "student"
                 let sql = 'INSERT INTO danceclassusers (userFirstName,userLastName,userDateJoined,userComments,userEmail,userPassword,userRole,userActive) VALUES ("' + req.body.firstname + '","' + req.body.lastname + '","' + datejoined + '","' + req.body.comments + '","' + email + '","' + password + '","' + role +  '","' + active + '");'
				//var insertQuery = "INSERT INTO danceclassusers (userFirstName,userLastName,userDateJoined,userComments,userEmail,userPassword,userRole,userActive) VALUES ("' + req.body.firstname + '","' + req.body.lastname + '","' + req.body.datejoined + '","' + req.body.comments + '","' + req.body.email + '","' + req.body.password + '","' + req.body.role +  '","' + req.body.active + '");'
					console.log(sql);
				let query = db.query(sql,function(err,rows){
				newUserMysql.id = rows.insertId;

				return done(null, newUserMysql);
				});
            }
		});
    }));


 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    //are there other options?
    //emailField did not seem to do anything
    passReqToCallback: true
},
    function(req, email, password, done) {
    console.log("local-signup");
		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
        let query = db.query("SELECT * FROM danceclassusers where userEmail = '"+email+"'",function(err,rows){
			console.log(rows);
			
			console.log("req.body.firstname: "+req.body.firstname);
			if (err){
			    console.log(err);
                return done(err);
			
			    
			}
			    
			 if (rows.length) {
			     console.log("email is already taken");
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                console.log("else");
				// if there is no user with that email
                // create the user
                var newUserMysql = new Object();
                console.log("new object");
                console.log("email :"+ email);
				newUserMysql.email    = email;
                newUserMysql.password = password; // use the generateHash function in our user model
                 let sql = 'INSERT INTO danceclassusers (userFirstName,userLastName,userDateJoined,userComments,userEmail,userPassword,userRole,userActive) VALUES ("' + req.body.firstname + '","' + req.body.lastname + '","' + req.body.datejoined + '","' + req.body.comments + '","' + email + '","' + password + '","' + req.body.role +  '","' + req.body.active + '");'
				//var insertQuery = "INSERT INTO danceclassusers (userFirstName,userLastName,userDateJoined,userComments,userEmail,userPassword,userRole,userActive) VALUES ("' + req.body.firstname + '","' + req.body.lastname + '","' + req.body.datejoined + '","' + req.body.comments + '","' + req.body.email + '","' + req.body.password + '","' + req.body.role +  '","' + req.body.active + '");'
					console.log(sql);
				let query = db.query(sql,function(err,rows){
				newUserMysql.id = rows.insertId;

				return done(null, newUserMysql);
				});
            }
		});
    }));
    
    
     	// =========================================================================
    // LOCAL EDITUSER ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

passport.use('local-updateuser', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    //are there other options?
    //emailField did not seem to do anything
    passReqToCallback: true
},
    function(req, email, password, done) {
        
                console.log("local-updateuser");
                console.log("req.params.id: "+req.params.id);

                let sql = 'UPDATE danceclassusers SET userFirstName= "' + req.body.newfirstname + '" , userLastName = "' + req.body.newlastname + '", userDateJoined = "' + req.body.newdatejoined + '", userComments = "' + req.body.newcomments + '", userEmail = "' + req.body.newemail + '", userPassword = "' + req.body.newpassword + '", userRole = "' + req.body.newrole + '", userActive = "'+ req.body.newactive +'" WHERE userId = "' + req.params.id + '" ;'

                // let sql = 'INSERT INTO danceclassusers (userFirstName,userLastName,userDateJoined,userComments,userEmail,userPassword,userRole,userActive) VALUES ("' + req.body.firstname + '","' + req.body.lastname + '","' + req.body.datejoined + '","' + req.body.comments + '","' + email + '","' + password + '","' + req.body.role +  '","' + req.body.active + '");'
				//var insertQuery = "INSERT INTO danceclassusers (userFirstName,userLastName,userDateJoined,userComments,userEmail,userPassword,userRole,userActive) VALUES ("' + req.body.firstname + '","' + req.body.lastname + '","' + req.body.datejoined + '","' + req.body.comments + '","' + req.body.email + '","' + req.body.password + '","' + req.body.role +  '","' + req.body.active + '");'
					console.log(sql);
				let query = db.query(sql,function(err,rows){
				//newUserMysql.id = rows.insertId;

				return done(null);
				});
            }
		)
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        username : 'email',
        password : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password,done) { // callback with email and password from our form
    console.log("local-login");
         let query = db.query("SELECT userFirstName, userEmail, userPassword, userRole FROM `danceclassusers` WHERE `userEmail` = '" + email + "'",function(err,rows){
			if (err)
                return done(err);
			 if (!rows.length) {
			 console.log("No user found");
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }

			// if the user is found but the password is wrong
            if (!( rows[0].userPassword == password)){
                 console.log("Oops! Wrong password");
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }
                

            // all is well, return successful user
            console.log("logged in "+rows[0].userEmail+ "  role: "+rows[0].userRole);
            return done(null, rows[0]);
          // return rows[0];

		});



    }));
    
    


};