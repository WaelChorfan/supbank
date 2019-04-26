// 'use strict';
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var UserSchema = new Schema({
//   email: {
//     type: String,
//     required: 'Please enter your email',
//     unique: true,
//     dropDups: true
//   },
//   username: {
//     type: String,
//   },
//   password: {
//     type: String,
//     required: 'Please enter your password',
//   },
//     publicKey: String,
//     privateKey: String ,
//   location: [{ type: Schema.Types.Mixed }],
//   Created_date: {
//     type: Date,
//     default: Date.now
//   },
//   balance: { type: Number ,default:0}
// });

// module.exports = mongoose.model('Users', UserSchema);