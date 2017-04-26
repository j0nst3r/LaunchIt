var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var PayPalStrategy = require('passport-paypal-oauth').Strategy;

var config = require('../../config/property.js')

var mongoose = require('mongoose');
var db = mongoose.connection;

var userSchema = require('../models/user.js');
var user = mongoose.model('Users', userSchema);

var profileSchema = require('../models/profile.js');
var profile = mongoose.model('Profiles', profileSchema);


var session = require('express-session');

module.exports = function (app, passport) {
    var hostUrl = config.apiUrl;

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false } }))

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        user.findById(id, function (err, user) {
            done(err, user);
        });
    });

    //==================== Facebook  ===========================================

    passport.use(new FacebookStrategy({
        clientID: '823444951139581',
        clientSecret: '174e3e5d33d503a5ac77d23161eea78e',
        callbackURL: hostUrl + 'auth/facebook/callback',
        profileFields: ['id', 'displayName', 'email']
    },
        function (accessToken, refreshToken, socialMedia, done) {
            user.findOne({ 'socialId': socialMedia.id }, function (err, curUser) {
                console.log(JSON.stringify(profile));
                if (err) {
                    return done(err);
                }
                if (!curUser) {
                    curUser = new user({
                        socialId: socialMedia.id
                    });

                    curUser.save(function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("finding user and creating profile");
                            user.findOne({ 'socialId': socialMedia.id }, function (err, result) {
                                console.log(result._id);
                                var newProfile = new profile({
                                    _id: result._id
                                });
                                newProfile.save(function (err) {
                                    if (err) console.log(err);
                                });

                            });
                        }
                    });
                    return done(null, curUser);

                } else {
                    console.log("EXISTING USER...")
                    //found user. Return
                    return done(null, curUser);
                }
            });
        }));

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            var url = "/login/";
            var userId = req.user._id;
            console.log(req.user._id);
            url = url.concat(userId);
            console.log(url);
            res.redirect(url);
        });

    //==================== Twitter ===========================================

    passport.use(new TwitterStrategy({
        consumerKey: 'ZqlQympcucnIMB4P0aVpZnGJK',
        consumerSecret: 'CICrKoL3KQaT9P9p5QzsUvSnjO2Oea1xVzZc2n6zezvNS3khGK',
        callbackURL: hostUrl + 'auth/twitter/callback',
        userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true"
    },
        function (token, tokenSecret, socialMedia, done) {
            //check user table for anyone with a profile.id
            user.findOne({ 'socialId': socialMedia.id }, function (err, curUser) {
                console.log(JSON.stringify(profile));
                if (err) {
                    return done(err);
                }
                if (!curUser) {
                    curUser = new user({
                        socialId: socialMedia.id
                    });

                    curUser.save(function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("finding user and creating profile");
                            user.findOne({ 'socialId': socialMedia.id }, function (err, result) {
                                var newProfile = new profile({
                                    _id: result._id
                                });
                                newProfile.save(function (err) {
                                    if (err) console.log(err);
                                });

                            });
                        }
                    });
                    return done(null, curUser);

                } else {
                    console.log("EXISTING USER...")
                    return done(null, curUser);
                }
            });
        }));

    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }),
        function (req, res) {
            var url = "/login/";
            var userId = req.user._id;
            console.log(req.user._id);
            url = url.concat(userId);
            console.log(url);
            res.redirect(url);
        });

    // ==================== LinkedIn ===========================================

    passport.use(new LinkedInStrategy({
        clientID: '86pgcisvxgos0e',
        clientSecret: 'IrlzgEBf9mZeJFwR',
        callbackURL: hostUrl + "auth/linkedin/callback",
        scope: ['r_emailaddress', 'r_basicprofile'],
    },
        function (accessToken, refreshToken, socialMedia, done) {

            user.findOne({ 'socialId': socialMedia.id }, function (err, curUser) {
                console.log(JSON.stringify(profile));
                if (err) {
                    return done(err);
                }
                if (!curUser) {
                    curUser = new user({
                        socialId: socialMedia.id
                    });

                    curUser.save(function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("finding user and creating profile");
                            user.findOne({ 'socialId': socialMedia.id }, function (err, result) {
                                var newProfile = new profile({
                                    _id: result._id
                                });
                                newProfile.save(function (err) {
                                    if (err) console.log(err);
                                });

                            });
                        }
                    });
                    return done(null, curUser);

                } else {
                    console.log("EXISTING USER...")
                    //found user. Return
                    return done(null, curUser);
                }
            });
        }));


    app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }), function (req, res) { });
    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }),
        function (req, res) {
            var url = "/login/";
            var userId = req.user._id;
            console.log(req.user._id);
            url = url.concat(userId);
            console.log(url);
            res.redirect(url);
        });

    //==================== Google ===========================================

    passport.use(new GoogleStrategy({
        clientID: '358732923710-ito5k4gg0s8qadi5416npkhesa6g9aj7.apps.googleusercontent.com',
        clientSecret: 'ar5cLIUNgZtJqeXm-y4CHKlV',
        callbackURL: hostUrl + "auth/google/callback"
    },
        function (accessToken, refreshToken, socialMedia, done) {
            user.findOne({
                'socialId': socialMedia.id
            }, function (err, curUser) {
                console.log(JSON.stringify(socialMedia));
                if (err) {
                    return done(err);
                }
                if (!curUser) {
                    curUser = new user({
                        socialId: socialMedia.id
                    });

                    curUser.save(function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("finding user and creating profile");
                            user.findOne({ 'socialId': socialMedia.id }, function (err, result) {
                                console.log(result._id);
                                var newProfile = new profile({
                                    _id: result._id
                                });
                                newProfile.save(function (err) {
                                    if (err) console.log(err);
                                });

                            });
                        }
                    });
                    return done(null, curUser);

                } else {
                    console.log("EXISTING USER...")
                    return done(null, curUser);
                }
            });
        }));

    app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'] }));
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            var url = "/login/";
            var userId = req.user._id;
            console.log(req.user._id);
            url = url.concat(userId);
            console.log(url);
            res.redirect(url);
        });

    passport.use(new PayPalStrategy({
        clientID: 'AcwWLYSt3VF6vuhyjes6GukyiUfSp2SHTkOM3KY71VxUd94fVzoP8elbd46Q9teYaXNikLVhE5Yi91Mc',
        clientSecret: 'EKqh-fg9IShFU_TqA7GMJMJMjPOrYu3Ynfl9zRaN4QQ3-isbxgpyC2Bg81i6llh9KHF3B2Wl1c56vyng',
        returnURL: hostUrl + '/auth/paypal/return',
        realm: hostUrl
    },
        function (identifier, done) {

            User.findByOpenID({ openId: identifier }, function (err, user) {
                return done(err, user);
            });
        }
    ));

    app.get('/auth/paypal',
        passport.authenticate('paypal'));

    app.get('/auth/paypal/callback',
        passport.authenticate('paypal', { failureRedirect: '/' }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    return passport;
}