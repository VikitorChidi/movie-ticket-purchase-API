import nodemailer from 'nodemailer';
import configs from "../configs/index";
import {CoreUtils} from "../utils/utils";

export class EmailService {
    /**
     * Send a confirmation email to a user.
     * @param phoneNumber - The phone number of the user to send the email to.
     * @param subject - The subject of the email.
     * @param body - The body of the email.
     */
     static async sendConfirmationEmail(phoneNumber: string, subject?: string, body?: string): Promise<void> {
         try {
             const {mails} = configs()
             const transporter = nodemailer.createTransport({
                 service: mails?.transport?.service,
                 auth: {
                     user: mails?.transport?.auth?.user,
                     pass: mails?.transport?.auth?.pass
                 }
             });

             const info = await transporter.sendMail({
                 from: mails?.defaults?.from,
                 to: `${CoreUtils.removePlusSign(phoneNumber)}@gmail.com`,
                 subject,
                 text: body
             });
             console.log('Message sent: %s', info.response);
         } catch (err: any) {
             throw new Error(err);
         }
     }
}
