
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
//         to: ['bhavanofficial@gmail.com'], // Send email to both addresses
//         subject: `New Order`,
//         text: `Order details are as follows:\n\nTitle: ${title}\nUserID: ${userId}\nOrder Date: ${orderDate}\nPayment ID: ${paymentId}\nPrice: ${price}\nQuantity: ${quantity}\nSize: ${size}\nUserEmail: ${userEmail}`,
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
    const { userId, orderDate, paymentId, userEmail, orderDetails } = req.body; // Expecting orderDetails as an array

    // Check if orderDetails is provided and is an array
    if (!Array.isArray(orderDetails) || orderDetails.length === 0) {
        return res.status(400).json({ message: 'Order details are required' });
    }

    // Create an email body
    let emailText = `Order details are as follows:\n\n`;

    orderDetails.forEach(item => {
        const { title, price, quantity, size } = item; // Destructure details from each order item
        emailText += `Title: ${title || "No Title"}\n`;
        emailText += `Price: ${price || 0}\n`;
        emailText += `Quantity: ${quantity || 0}\n`;
        emailText += `Size: ${size || 'N/A'}\n\n`;
    });

    emailText += `UserID: ${userId || "No User ID"}\nOrder Date: ${orderDate || "No Order Date"}\nPayment ID: ${paymentId || "No Payment ID"}\nUserEmail: ${userEmail || "No User Email"}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: ['bhavanofficial@gmail.com'], // Send email to both addresses
        subject: `New Order`,
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
