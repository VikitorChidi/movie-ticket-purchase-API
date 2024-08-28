import config from '../configs'
import {Paystack} from "paystack-sdk";

const paystack = new Paystack(<string>config().paymentSecret?.paystackSecretKey)

/**
 * Paystack Service. This service is responsible for handling all paystack transactions.
 */
export class PaystackService {
    /**
     * Charge a user using paystack. This method initializes a transaction on paystack.
     * @param amount
     * @param email
     * @param currency
     */
    static async charge(amount: string, email: string, currency: string) {
        return await paystack.transaction.initialize({
            amount,
            email,
            currency: currency
        })
    }
}
