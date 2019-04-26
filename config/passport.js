var EC = require('elliptic').ec

var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var userLoc = require('./geo-location').trackingLoc

var User = require('../app/models/user')
var configAuth = require('./auth')
var genNickName=require('../utils/msc');



module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id)
	})

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user)

		})
	})

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
		function (req, email, password, done) {
			process.nextTick(function () {
				User.findOne({ 'local.username': email }, function (err, user) {
					if (err)
						return done(err)
					if (user) {
						return done(null, false, req.flash('signupMessage', 'That email already taken'));
					} else {

						var newUser = new User()
						newUser.local.username = email
						newUser.local.password = newUser.generateHash(password)
						newUser.nickName=genNickName()

						var KeyGen = new EC('secp256k1').genKeyPair()
						var pub = KeyGen.getPublic('hex').toString(16)
						var prv = KeyGen.getPrivate('hex').toString(16)

						newUser.publicKey = pub
						newUser.privateKey = prv

						newUser.balance = 0

						newUser.save(function (err, user) {
							if (err) { throw err } else {
								return done(null, newUser)
							}
						})
					}
				})

			})
		}))

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, (req, email, passwd, done) => {
		process.nextTick(() => {
			User.findOne({ "local.username": email }, (err, user) => {
				if (err) return done(err)
				if (!user) return done(null, false, req.flash('loginMessage', 'no user found '))
				if (!user.validPassword(passwd)) return done(null, false, req.flash('loginMessage', 'invalid password'))

				userLoc(user.publicKey)
				return done(null, user)

			})
		})
	}))



	passport.use(new GoogleStrategy({
		clientID: configAuth.googleAuth.clientID,
		clientSecret: configAuth.googleAuth.clientSecret,
		callbackURL: configAuth.googleAuth.callbackURL
	},
		function (accessToken, refreshToken, profile, done) {

			process.nextTick(function () {
				User.findOne({ 'google.id': profile.id }, (err, user) => {
					if (err) return done(err)
					if (user) { return done(null, user) }
					else {
						var newUser = new User()
						newUser.google.id = profile.id
						newUser.google.token = accessToken
						newUser.google.name = profile.displayName
						newUser.google.email = profile.emails[0].value

						newUser.nickName=genNickName()

						var KeyGen = new EC('secp256k1').genKeyPair()
						var pub = KeyGen.getPublic('hex').toString(16)
						var prv = KeyGen.getPrivate('hex').toString(16)

						newUser.publicKey = pub
						newUser.privateKey = prv

						newUser.balance = 0

						newUser.save((err) => {
							if (err) { throw err }
							else {
								return done(null, newUser)
							}
						}
						)

					}
				})
			}
			)
		}
	))

}