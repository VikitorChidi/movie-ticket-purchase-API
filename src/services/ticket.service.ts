import { IBookTicketInterface } from "../utils/book-ticket.interface";
import { Movie } from "../models/movie.model";
import { User } from "../models/user.model";
import { Ticket } from "../models/ticket.model";
import { PaystackService } from "./paystack.service";
import { CoreUtils } from "../utils/utils";
import { WebhookService } from "./webhook.service";
import { EmailService } from "./email.service";

/**
 * TicketService class. This class is responsible for handling all the business logic for the Ticket model.
 */
export class TicketService {
    static async bookTicket(ticketDetails: IBookTicketInterface) {
        const { movie_id, user_id, price } = ticketDetails;

        // Check if the movie and user exist
        const existingMovie = await Movie.findById(movie_id);
        if (!existingMovie) {
            throw new Error("Movie not found");
        }

        const existingUser = await User.findById(user_id);
        if (!existingUser) {
            throw new Error("User not found");
        }

        // Create a new ticket
        let ticket;
        try {
            ticket = await Ticket.create({
                movie_id: movie_id,
                user_id: user_id,
                price,
                status: "booked"
            });
        } catch (err: any) {
            throw new Error("Ticket creation failed: " + err.message);
        }

        // Attempt to make the payment
        const makePayment = await PaystackService.charge(CoreUtils.convertPriceToKobo(price).toString(), existingUser.email, 'NGN');
        if (!makePayment) {
            // If payment fails, remove the created ticket
            await Ticket.findByIdAndDelete(ticket._id);
            throw new Error("Payment failed");
        }
        console.info({
            message: `${makePayment.message}`,
            status: `${makePayment.status}`,
            reference: makePayment.data?.reference,
            url: `${makePayment.data?.authorization_url}`
        });

        // Update the ticket status
        try {
            ticket.status = "paid";
            ticket.payment_reference = makePayment.data?.reference;
            await ticket.save();
        } catch (err:any) {
            // If updating the ticket status fails, remove the created ticket
            await Ticket.findByIdAndDelete(ticket._id);
            throw new Error("Failed to update ticket status: " + err.message);
        }

        // Trigger the webhook
        try {
            const webhookPayload = {
                ticket_id: ticket._id,
                price: `${CoreUtils.numberWithCommas(price)}NGN`,
                movies: [{ id: existingMovie._id, name: existingMovie.name }],
                user: { name: existingUser.name, phone_number: existingUser.phone_number },
                time_booked: ticket.time_booked,
            };

            await WebhookService.triggerWebhook(webhookPayload);
        } catch (err:any) {
            // Log error but do not affect ticket creation
            console.error("Webhook trigger failed: " + err.message);
        }

        // Send email to user
        try {
            await EmailService.sendConfirmationEmail(
                existingUser.phone_number,
                'Ticket Confirmation',
                `Your ticket has been booked successfully.\nTicket ID: ${ticket._id} \n Movie: ${existingMovie.name} \n Price: ${CoreUtils.numberWithCommas(price)}NGN \n Time Booked: ${ticket.time_booked} \n Payment Reference: ${ticket.payment_reference}`);
        } catch (err:any) {
            // Log error but do not affect ticket creation
            console.error("Email sending failed: " + err.message);
        }

        return {
            ticket_id: ticket._id,
            movie: existingMovie.name,
            price: CoreUtils.numberWithCommas(price) + 'NGN',
            time_booked: ticket.time_booked,
            status: ticket.status,
            payment_reference: ticket.payment_reference,
            payment_url: makePayment.data?.authorization_url
        }
    }
}
