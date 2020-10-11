//INSPIRED BY https://gist.github.com/manjeshpv/84446e6aa5b3689e8b84


var passport = require('passport');
var utils = require('../utils.js');
var LocalStrategy   = require('passport-local').Strategy;
var LocalStrategy   = require('passport-local').Strategy;
var session = require('express-session');
var express = require("express"); // call expresss to be used by application
var app = express();
var flash = require('express-flash-messages')
app.use(flash())


var mysql = require('mysql');

const db = mysql.createConnection({
    host: 'isabellebidou.com',
    user: '***_1',
    password: '*****',
    database: '****le_db',
    port: 3306
});


module.exports = function(passport) {


    // LOCAL Self_SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    function(req, email, password, done) {
    console.log("local-register");
//------------------------------------check if email is already in use
        let query = db.query("SELECT * FROM danceclassusers where userEmail = '"+email+"'",function(err,rows){
			console.log(rows);
			
			console.log("req.body.firstname: "+req.body.firstname);
			if (err){
			    console.log(err);
                return done(err);
			    
			}
			    
			 if (rows.length) {
			     console.log("email is already taken");
			     req.flash('notify', 'That email is already taken.')
                
                return done(null, false);
            } else {
                console.log("else");
				// if there is no user with that email
                // create the user
               
               
                var d = new Date();
                var datejoined = "";
                var y = utils.addZero(d.getFullYear(), 4);
                var mo = utils.addZero(d.getMonth() + 1, 2);// javascript getMonth() starts at 0
                var da = utils.addZero(d.getDate(), 2);
                datejoined  = y + "-" + mo + "-" + da;
                var active = "inactive";
                var role= "student"
                 var newUserMysql = new Object();
                console.log("new object");
                console.log("email :"+ email);
                newUserMysql.userFirstName = req.body.firstname;
                newUserMysql.userLastName = req.body.lastname;
				newUserMysql.userEmail    = email;
                newUserMysql.userPassword = password; 
                newUserMysql.userRole = role;
                newUserMysql.active = active;
                 let sql = 'INSERT INTO danceclassusers (userFirstName,userLastName,userDateJoined,userComments,userEmail,userPassword,userRole,userActive) VALUES ("' + req.body.firstname + '","' + req.body.lastname + '","' + datejoined + '","' + req.body.comments + '","' + email + '","' + password + '","' + role +  '","' + active + '");';
				//var insertQuery = "INSERT INTO danceclassusers (userFirstName,userLastName,userDateJoined,userComments,userEmail,userPassword,userRole,userActive) VALUES ("' + req.body.firstname + '","' + req.body.lastname + '","' + req.body.datejoined + '","' + req.body.comments + '","' + req.body.email + '","' + req.body.password + '","' + req.body.role +  '","' + req.body.active + '");'
					console.log(sql);
			
				let query = db.query(sql,function(err,rows){
				newUserMysql.userId = rows.insertId;
				
				console.log(rows.insertId);
				if (err){throw err};
				let sql2 = 'SELECT * FROM danceclassusers WHERE userId = '+rows.insertId+';'
				console.log(sql2);
				let query2 = db.query(sql2, function(err, rows){
				    if (err){throw err};
				    const user = rows;
				    console.log(rows);
				    req.login(newUserMysql, function(err, rows){
				        if (err){
				            throw err
				            
				        };
				        
				        console.log(newUserMysql.userId);
				        return done(null, newUserMysql);
				    });
				    
				});
				

				
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
			     req.flash('notify', 'That email is already taken.')
                return done(null, false);
            } else {
                console.log("else");
				// if there is no user with that email
                // create the user

                 let sql = 'INSERT INTO danceclassusers (userFirstName,userLastName,userDateJoined,userComments,userEmail,userPassword,userRole,userActive) VALUES ("' + req.body.firstname + '","' + req.body.lastname + '","' + req.body.datejoined + '","' + req.body.comments + '","' + email + '","' + password + '","' + req.body.role +  '","' + req.body.active + '");'
				//var insertQuery = "INSERT INTO danceclassusers (userFirstName,userLastName,userDateJoined,userComments,userEmail,userPassword,userRole,userActive) VALUES ("' + req.body.firstname + '","' + req.body.lastname + '","' + req.body.datejoined + '","' + req.body.comments + '","' + req.body.email + '","' + req.body.password + '","' + req.body.role +  '","' + req.body.active + '");'
					console.log(sql);
				let query = db.query(sql,function(err,results,fields){

				
				
				if (err){throw err};
				
				db.query('SELECT LAST_INSERT_ID() as user_id'), function(err, results, fields){
				    if (err){throw err};
				    const user_id = results[0];
				    console.log(results[0]);
				    req.login(user_id, function(err){
				        return done(null, user_id);
				    })
				    
				}
				

				
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
        passReqToCallback : true 
    },
    function(req, email, password,done) { 
    console.log("local-login: "+email);
         let query = db.query("SELECT userId, userFirstName, userLastName, userEmail, userPassword, userRole, userActive FROM `danceclassusers` WHERE `userEmail` = '" + email + "'",function(err,rows){
			if (err)
                return done(err);
			 if (!rows.length) {
			 console.log("No user found");
			 req.flash('notify', 'Wrong password.')
                return done(null, false); 
            }

			// if the user is found but the password is wrong
            if (!( rows[0].userPassword == password)){
                 console.log("Oops! Wrong password");
                req.flash('notify', 'Wrong password.')
                
                return done(null, false);
            }
                

            // all is well, return successful user
            console.log("logged in "+rows[0].userEmail+ "  role: "+rows[0].userRole);

          return done(null, rows[0]);
          				    

		});



    }));
    
    
    
passport.serializeUser(function(user, done) {
    console.log("serialize");
    console.log(user);
  done(null, user);
});
passport.deserializeUser(function(user, done) {
console.log("deserialize");
console.log(user);
    
   // db.query("select * from danceclassusers where userId = "+user.userId,function(err,rows){	
			done(null, user);
//		});

});

};

