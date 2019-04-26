
var User = require('./models/user');

module.exports = function (app, passport) {
	//#region auth
	app.get('/', function (req, res) {
		res.render('index.ejs');
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
		console.log("-profile-"+req.user.google.name||req.user.local.username);
		res.render('profile.ejs', { user: req.user,title:req.user.google.name||req.user.local.username});
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




	var testRouter = require('./routes/test');
	// var txnsRouter = require('./routes/txns');
	// var walletRouter = require('./routes/wallet');
	var mapRouter = require('./routes/map');
	// var blocksRouter = require('./routes/blocks');
	// var mineRouter = require('./routes/mine');
	var apiRouter = require('./routes/api/usersLocations');

	app.use('/test', isLoggedIn, testRouter);
	// app.use('/txns', isLoggedIn, txnsRouter);
	// app.use('/wallet', isLoggedIn, walletRouter);
	app.use('/map', isLoggedIn, mapRouter)
	// app.use('/blocks', isLoggedIn, blocksRouter);
	// app.use('/mine', isLoggedIn, mineRouter);
	app.use('/api', isLoggedIn, apiRouter);


	//#endregion
}