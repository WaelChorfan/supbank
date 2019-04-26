'use strict';
var mongoose = require('mongoose')
const bcrypt = require('bcrypt')
var Schema = mongoose.Schema

var userSchema = mongoose.Schema({
	local: {
		username: String,
		password: String
	},
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	publicKey: String,
	privateKey: String,
	location: [{ type: Schema.Types.Mixed }],
	Created_date: {
		type: Date,
		default: Date.now
	},
	balance: { type: Number, default: 0 }
});
userSchema.methods.generateHash = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9))
}
userSchema.methods.validPassword = function (password) {
	console.log(password + "---is equal to ---" + this.local.password);
	return bcrypt.compareSync(password, this.local.password)
}

userSchema.methods.decryptPass = function (hash) {
	return bcrypt.compare(9, this.local.password, function (err, res) { console.log(res); })
}



module.exports = mongoose.model('User', userSchema);