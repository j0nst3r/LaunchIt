var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

var User             = require('../models/user');
var session          = require('express-session');

module.exports = function(app, passport){

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false }}))

    passport.serializeUser(function(user, done) { 
    done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
        });
    });

//==================== Facebook  ===========================================

    passport.use(new FacebookStrategy({
        clientID: '823444951139581',
        clientSecret: '174e3e5d33d503a5ac77d23161eea78e',
        callbackURL: "http://localhost:8080/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
        console.log( profile._json.email);  //email
        var name = profile._json.name.split(" ");
        console.log( name[0] ); // FirstName
        console.log( name[1] ); // LastName
        var passIn = "Password!";
 /*
        if (  MongoDBemail   == profile._json.email) {  
            login with user
        } else { 
            create user and login
        }
*/

            done(null,profile);
        }
    ));

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {  successRedirect: '/', failureRedirect: '/login', scope:['email'] }));


//==================== Twitter ===========================================

    passport.use(new TwitterStrategy({
        consumerKey: 'ZqlQympcucnIMB4P0aVpZnGJK',
        consumerSecret: 'CICrKoL3KQaT9P9p5QzsUvSnjO2Oea1xVzZc2n6zezvNS3khGK',
        callbackURL: "http://localhost:8080/auth/twitter/callback",
        userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true"
    },
    function(token, tokenSecret, profile, done) {

       console.log(profile.emails[0].value); // email
       console.log(profile.displayName);   // DisplayName "Captain Teemo"
 
       
      done(null,profile);
    }
    ));

    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));

// ==================== LinkedIn ===========================================

    passport.use(new LinkedInStrategy({
        clientID: '86pgcisvxgos0e',
        clientSecret: 'IrlzgEBf9mZeJFwR',
        callbackURL: "http://localhost:8080/auth/linkedin/callback",
        scope: ['r_emailaddress', 'r_basicprofile'],
    }, 
    function(accessToken, refreshToken, profile, done) {
        //console.log('linkedin profile', profile);
        process.nextTick(function () {
            
            console.log(profile.emails[0].value);
            console.log(profile.name.givenName);
            console.log(profile.name.familyName);
            
            return done(null, profile);
        });
    }));

    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { successRedirect: '/', failureRedirect: '/login' }));
    app.get('/auth/linkedin',  passport.authenticate('linkedin', { state: 'SOME STATE'  }),  function(req, res){
    });

  
//==================== Google ===========================================

    passport.use(new GoogleStrategy({
        clientID: '358732923710-ito5k4gg0s8qadi5416npkhesa6g9aj7.apps.googleusercontent.com',
        clientSecret: 'ar5cLIUNgZtJqeXm-y4CHKlV',
        callbackURL: "http://localhost:8080/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile.emails[0].value);
        console.log(profile.name.givenName);
        console.log(profile.name.familyName);
      //  User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //      return done(err, user);
      // });
      done(null,profile);
    }
    ));

    app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'] }));
    app.get('/auth/google/callback',  passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
            res.redirect('/');
    });
    
    return passport;
}