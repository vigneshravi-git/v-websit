require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS, // App password
  },
});

// API to handle form submission
app.post('/send-email', async (req, res) => {
  const { name, email, contact, company, city, country, sample_link, services, requesting_as, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'vonephotoediting@gmail.com',
    subject: 'New Form Submission',
    text: `
      Name: ${name}
      Email: ${email}
      Contact: ${contact}
      Company: ${company}
      City: ${city}
      Country: ${country}
      Sample File Link: ${sample_link}
      Services Looking For: ${services}
      Requesting As: ${requesting_as}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error sending email', error });
  }
});

app.post("/submit", (req, res) => {
    console.log(req.body); // Debugging
    res.json({ message: "Form submitted successfully!" });
});
