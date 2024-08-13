const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Convertir l'image en base64
const logoPath = path.join(__dirname, '../assets/logo.png');
let logoBase64;

try {
    logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });
} catch (error) {
    console.error("Erreur lors de la lecture de l'image :", error);
}

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
        subject: 'Vérification de votre adresse email',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    ${logoBase64 ? `<img src="data:image/png;base64,${logoBase64}" alt="Logo" style="width: 150px;">` : '<p>Logo non disponible</p>'}
                </div>
                <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #333333; text-align: center;">Vérification de votre adresse email</h2>
                    <p style="color: #666666; line-height: 1.5;">Bonjour,</p>
                    <p style="color: #666666; line-height: 1.5;">Merci de vous être inscrit sur notre plateforme. Pour compléter votre inscription, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous.</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${process.env.CLIENT_URL}/verify-email/${userId}" style="background-color: #4CAF50; color: white; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold;">Vérifier mon email</a>
                    </div>
                    <p style="color: #999999; font-size: 12px; text-align: center;">Si vous n'avez pas créé de compte, vous pouvez ignorer cet email.</p>
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <p style="color: #999999; font-size: 12px;">© 2024 VotreEntreprise. Tous droits réservés.</p>
                </div>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
