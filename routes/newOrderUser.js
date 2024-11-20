
// const express = require('express');
// const nodemailer = require('nodemailer');
// const router = express.Router();

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// router.post('/', (req, res) => {
//     const { title, userId, orderDate, paymentId, price, quantity, size, userEmail } = req.body;

//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: [userEmail],
//         subject: `New Order Request Received`,
//         text: `Your Request for the Order from Insomniac has been accepted and the details are as follows:\n\n Product Name : ${title}\n Your UserID : ${userId}\n Your Order Date : ${orderDate}\n Order Payment ID : ${paymentId}\n Product Price : ${price}\n Product Quantity: ${quantity}\n Product Size : ${size}\n\n\n\n THANK YOU FOR BEING A PART OF OUR FAMILY`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending email:', error);
//             return res.status(500).json({ message: 'Failed to send email' });
//         }
//         console.log('Email sent:', info.response);
//         res.status(200).json({ message: 'Email sent successfully' });
//     });
// });

// module.exports = router;


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
    const { userId, orderDate, paymentId, userEmail, orderDetails } = req.body; // Adjusted to expect an array of orderDetails

    // Check if orderDetails is provided and is an array
    if (!Array.isArray(orderDetails) || orderDetails.length === 0) {
        return res.status(400).json({ message: 'Order details are required' });
    }

    // Create an email body
    let emailText = `Your Request for the Order from Insomniac has been accepted and the details are as follows:\n\n`;

    orderDetails.forEach(item => {
        const { title, price, quantity, size } = item; // Destructure details from each order item
        emailText += `Product Name : ${title || "No Title"}\n`;
        emailText += `Product Price : ${price || 0}\n`;
        emailText += `Product Quantity: ${quantity || 0}\n`;
        emailText += `Product Size : ${size || 'N/A'}\n\n`;
    });

    emailText += `Your UserID : ${userId}\nYour Order Date : ${orderDate}\nOrder Payment ID : ${paymentId}\n\n\nTHANK YOU FOR BEING A PART OF OUR FAMILY`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: [userEmail],
        subject: `New Order Request Received`,
        text: emailText,
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
