//here the return email is sent to admin

const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

router.post('/', (req, res) => {
    const { title, description, userId, orderDate, paymentId, price, quantity, size, userEmail } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: ['bhavanofficial@gmail.com'], // Send email to both addresses
        subject: `New Return Order`,
        text: `Return details are as follows:\n\nTitle: ${title}\nDescription: ${description}\nUserID: ${userId}\nOrder Date: ${orderDate}\nPayment ID: ${paymentId}\nPrice: ${price}\nQuantity: ${quantity}\nSize: ${size}\nUserEmail: ${userEmail}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Failed to send email' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully' });
    });
});

module.exports = router;
