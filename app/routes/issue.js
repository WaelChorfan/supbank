var express = require('express');
var router = express.Router();


router.post('/', (req, res) => {
    if (req.user.google.email) {
        require('../../utils/sendEmail')(req.user.google.email, req.body.mailContent)
    } else if (req.user.local.username) {
        require('../../utils/sendEmail')(req.user.local.username, req.body.mailContent)
    } else {
        res.render('index.ejs', {
            message: "you do not have a valid Gmail address",
            logged: true
        });
    }

    res.render('index.ejs', {
        message: "Your message was successfully received ,we will check to your questions/issues and send you an email ",
        logged: true
    });
});

module.exports = router;


