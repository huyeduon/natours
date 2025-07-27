const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // 2) Define the email options
    const mailOptions = {
      from: 'Huyen Duong <duongtrunghuyen@gmail.com>',
      to: options.email,
      subject: options.subject,
      text: options.message,
    };
    // 3) Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // re-throw to handle in controller
  }
};

module.exports = sendEmail;
