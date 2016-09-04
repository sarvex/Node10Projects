const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'sarvex.jatasra@gmail.com',
      password: 'something'
    }
  });

  const mailOptions = {
    from: 'John Doe <johndoe@outlook.com',
    to: 'sarvex.jatasra@gmail.com',
    subject: 'Website Submission',
    text: 'You have a new submission with the following details... Name: ' + req.body.name + ' Email: '+req.body.email+' Message: '+req.body.message,
    html: '<p> You have got a new submission with the following details... </p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Messge: '+req.body.message+'</li></ul>',
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
      res.render('error', {
        message: err.message,
        error: err
      });
    }
    res.redirect('/');
  });
});

module.exports = router;

