const publicIp = require('public-ip');
const geoip = require('geoip-lite');
var mongoose = require('mongoose');
const User = require('../app/models/user');

function trackLoc(address) {
    console.log("Location tracking");
    (async () => {
        const ip = await publicIp.v4();
        const geo = geoip.lookup(ip);
        User.update({ publicKey: address }, { $set: { location: geo } }, function (err, user) {
        })
    }
    )()
}

module.exports.trackingLoc = trackLoc;