import express from 'express';
import {TicketController} from "../controllers/ticket.controller";

const router = express.Router();

/**
 * Get tickets
 */
router.get('/tickets', TicketController.getTickets)

/**
 * Get a ticket by id
 */
router.get('/:id', TicketController.getATicket)

/**
 * @swagger
 * /ticket/book-ticket:
 *   post:
 *     summary: Book a movie ticket
 *     tags:
 *       - Ticket
 *     requestBody:
 *       description: The ticket booking request body
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: string
 *                 description: The ID of the movie
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               price:
 *                 type: number
 *                 description: The price of the ticket
 *             required:
 *               - movieId
 *               - userId
 *               - price
 *     responses:
 *       '201':
 *         description: Ticket booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       '400':
 *         description: Invalid request
 *       '500':
 *         description: Internal server error
 */
router.post('/book-ticket', TicketController.bookTicket)

export default router;
