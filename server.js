var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
require('./config/passport')(passport);


var configDB = require('./config/database.js');
mongoose.connect(configDB.local, { useNewUrlParser: true });

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

require('./app/routes.js')(app, passport)

app.listen(port)
console.log('http://localhost:' + port)