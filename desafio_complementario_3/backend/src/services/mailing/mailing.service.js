import { createTransport } from 'nodemailer';
import config from '../../../envConfig.js';
import { resetEmailTemplate } from './resetPassTemplate.js';
import { welcomeTemplate } from './welcomeTemplate.js';

const transporter = createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: config.EMAIL_GMAIL,
        pass: config.PASSWORD_GMAIL
    }
});

/**
 * 
 * @param {*} user 
 * @param {*} service register | resetPass
 * @param {*} token 
 * @returns 
 */
export const sendEmail = async (user, service, token = null) => {
    try {
        const { first_name, email } = user;
        let msg = "";

        service === 'register' 
        ? (msg = welcomeTemplate(first_name, email) )
        : service === 'resetPass' 
        ? (msg = resetEmailTemplate(first_name, token) )
        : (msg = "");

        const gmailOptions = {
            from: config.EMAIL_USER,
            to: email,
            subject: service ==='register'? 'Welcome to the Marce Store!' : 'Marce Store - Reset Password',
            html: msg
        };

        const response = await transporter.sendMail(gmailOptions);
        if(token) return token;
        console.log(' mail sent to ' + response)
    } catch (error) {
        throw new Error(error);
    }
}