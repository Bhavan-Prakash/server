//here the return email is sent to user

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
        to: [userEmail],
        subject: `Return Order`,
        text: `Your Request for Return are confirmed and the details are as follows:\n\n Product Name : ${title}\n Product Description : ${description}\n Your UserID : ${userId}\n Your Order Date : ${orderDate}\n Order Payment ID : ${paymentId}\n Product Price : ${price}\n Product Quantity: ${quantity}\n Product Size : ${size}\n`,
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
