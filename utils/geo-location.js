const publicIp = require('public-ip');
const geoip = require('geoip-lite');
var mongoose = require('mongoose');
const User = mongoose.model('Users');

function trackLoc(emailToLocate) {
    console.log("Location tracking");
    (async () => {
        const ip = await publicIp.v4();
        const geo = geoip.lookup(ip);
        User.update({ email: emailToLocate }, { $set: { location: geo } }, function (err, user) {
        })
    }
    )()
}

module.exports.trackingLoc = trackLoc;