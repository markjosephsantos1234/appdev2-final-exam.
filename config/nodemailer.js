const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEventEmail = async (to, data) => {
  const html = pug.renderFile(path.join(__dirname, '../emails/eventCreated.pug'), data);
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Event Created!',
    html
  });
};

module.exports = sendEventEmail;
