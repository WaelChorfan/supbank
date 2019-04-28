module.exports = function (mailFrom,mailContent) {

  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'supbank051@gmail.com',
      pass: 'Xc0T5mBzEix7y9Z1'
    }
  });

  var mailOptions = {
    from: mailFrom,
    to: 'supbank051@gmail.com',
    subject: 'SupBank-FAQ-Support',
    text: mailContent
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent successfully: ' + info.response);
    }
  });
}


