import { config } from 'dotenv';
import {Transport} from "nodemailer";
import {OptionalOptions} from "nodemailer/lib/dkim";

config();

export interface MailerConfig {
    transport: {
        service: string | undefined;
        host: string | undefined;
        port: number;
        secure: boolean;
        auth: {
            user: string | undefined;
            pass: string | undefined;
        };
    };
    defaults: {
        from: string | undefined;
    };
}

export const mailerConfig = (): MailerConfig => ({
    transport: {
        service: process.env.MAIL_SERVICE,
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT || '587', 10),
        secure: true,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    },
    defaults: {
        from: process.env.MAIL_FROM,
    },
});
