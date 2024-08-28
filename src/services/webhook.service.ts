import axios from 'axios';
import configs from "../configs";

/**
 * WebhookService class to trigger webhook.
 */
export class WebhookService {
    /**
     * Trigger webhook with payload. This method will send a POST request to the webhook URL with the payload.
     * @param payload
     */
    static async triggerWebhook(payload: any): Promise<void> {
        try {
            await axios.post(<string>configs().webhookUrl, payload);
        } catch (err: any){
            throw new Error(err);
        }
    }
}
