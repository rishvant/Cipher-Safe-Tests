import nodeMailer from 'nodemailer';
import generatePdf from './pdfService';

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        secure: true,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_APP_PASS,
        },
        authMethod: 'LOGIN',
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.to,
        subject: options.subject,
        html: options.message,
        attachments: [
            {
                filename: 'document.pdf',
                content: generatePdf(),
                encoding: 'base64',
            }
        ]
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;
