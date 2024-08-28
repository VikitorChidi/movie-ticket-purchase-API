import {config} from 'dotenv'
import {mailerConfig, MailerConfig} from "./mail";

config()

interface iConfig {
    baseUrl: string;
    port: number;
    env: string;
    mails: MailerConfig;
    webhookUrl: string | undefined;
    paymentSecret: {
        paystackSecretKey: string;
    }
}

export default (): Partial<iConfig> => {
    return ({
        baseUrl: process.env.APP_BASE_URL || 'http://localhost',
        env: process.env.NODE_ENV || 'development',
        port:  parseInt(process.env.APP_PORT || '8080', 10),
        webhookUrl: process.env.WEBHOOK_URL,
        mails: mailerConfig(),
        paymentSecret: {
            paystackSecretKey: process.env.PAYSTACK_SECRET_KEY || ''
        }
    });
}
