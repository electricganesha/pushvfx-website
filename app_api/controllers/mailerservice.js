'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'info@pushvfx.com',
        pass: 'Pretinha_1409'
    }
});

exports.sendContactEmail = function(req,res)
{
  var data = req.body;

  transporter.sendMail(
    {
      from:data.contactEmail,
      to: 'info@pushvfx.com',
      subject:'WEBSITE CONTACT - FROM - ' + data.contactName + " - WITH SUBJECT - " + data.contactSubject,
      text: data.contactMessage
    });

    res.json(data);
}
