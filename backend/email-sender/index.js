const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', (req, res) => {
  const message = req.body.message;

  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f5bd99c0ba75c9",
      pass: "ef6a39c3303837"
    }
  });

  const mailOptions = {
    from: 'sandbox.smtp.mailtrap.io',
    to: 'sandbox.smtp.mailtrap.io',
    subject: 'Testando',
    text: `
      Message: ${message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
