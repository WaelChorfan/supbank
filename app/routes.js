
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const flash = require('connect-flash');
require('../config/passport')(passport);
var User = require('./models/user');

var app = express();
var configDB = require('../config/database.js');
mongoose.connect(configDB.cloud, { useNewUrlParser: true });

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'anystringoftext',
	saveUninitialized: true,
	resave: true,
	cookie: { maxAge : 3600000 } // time im ms 
}));

app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, './public')));
app.use(flash())

var User = require('./models/user');


module.exports = function (app, passport) {
	//#region auth
	app.get('/', function (req, res) {
		res.render('index.ejs',{logged:req.isAuthenticated(),message:'Welcome to Sup Bank' });
	});
	app.get('/signup', function (req, res) {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/login', function (req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	})

	app.post('/login', passport.authenticate('local-login', {

		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	})
	);

	app.get('/profile', isLoggedIn, (req, res) => {
		require('../utils/geo-location')(req.user.publicKey)
		res.render('profile.ejs',
		 { user: req.user,title:req.user.google.name||req.user.local.username});
	});

	//middelware
	function isLoggedIn(req, res, next) {
		console.log(req.isAuthenticated());
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}


	app.get('/logout', (req, res) => {
		//function added by passport
		req.logout()
		res.redirect('/');
	});



	//google
	app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

	app.get('/auth/google/callback',
		passport.authenticate('google', {
			successRedirect: '/profile',
			failureRedirect: '/'
		}));

	//#endregion 

	//#region routes setup

	var issueRouter = require('./routes/issue');
	var txnsRouter = require('./routes/txns');
	var walletRouter = require('./routes/wallet');
	var mapRouter = require('./routes/map');
	var blocksRouter = require('./routes/blocks');
	var mineRouter = require('./routes/mine');
	var apiLocationsRouter = require('./routes/api/usersLocations');
	var apiNickNamesRouter = require('./routes/api/nickNames');

	app.use('/issue', isLoggedIn, issueRouter);
	app.use('/txns', isLoggedIn, txnsRouter);
	app.use('/wallet', isLoggedIn, walletRouter);
	app.use('/map', isLoggedIn, mapRouter)
	app.use('/blocks', isLoggedIn, blocksRouter);
	app.use('/mine', isLoggedIn, mineRouter);
	app.use('/api/usersLocations', isLoggedIn, apiLocationsRouter);
	app.use('/api/nickNames',  apiNickNamesRouter);


	//#endregion
}