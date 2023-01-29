const nodemailer = require('nodemailer')


class EmailSender {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mushrafmim@gmail.com',
                pass: 'upsmtvrassftdsvu'
            }
        })
    }

    sendEmail({ to, subject, html }) {
        let mailOptions = {
            from: process.env.EMAIL,
            to: to,
            subject: subject,
            html: html
        };

        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOptions, (err, info) => {
                if (err) return reject(err);
                return resolve();
            });
        });
    }

}

module.exports = EmailSender