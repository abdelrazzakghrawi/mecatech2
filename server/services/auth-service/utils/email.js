const nodemailer = require('nodemailer');

// Exemple de définition de la fonction
const sendVerificationEmail = async (email, userId) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verification Email',
        text: `Please verify your email by clicking on the following link: ${process.env.CLIENT_URL}/verify-email/${userId}`,
    };

    await transporter.sendMail(mailOptions);
};

// Exporter la fonction
module.exports = sendVerificationEmail;
