const Sib = require('@getbrevo/brevo');

require('dotenv').config();

const apiInstance = new Sib.TransactionalEmailsApi();
apiInstance.authentications['apiKey'].apiKey = process.env.SENDINBLUE_API_KEY;

exports.sendEmail = (req, res, next) => {
    const email = req.body.email;
    
    const sender = {
        email: 'parrichaya.ecec@gmail.com'
    }

    const receivers = [{ email }]

    apiInstance.sendTransacEmail({
        sender,
        to: receivers,
        subject: 'Password Reset',
        textContent: 'Password Reset',
    })
    .then(() => {
        console.log('Email sent successfully');
        res.status(200).json({ message: 'Email sent!' });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error sending email' });
    })
}