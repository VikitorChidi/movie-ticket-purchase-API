import express, { Request, Response, NextFunction } from 'express';
import { TicketController } from "../controllers/ticket.controller";
import { check, param, validationResult } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * /ticket/all:
 *   get:
 *     summary: Get tickets
 *     tags:
 *       - Ticket
 *     responses:
 *       200:
 *         description: A list of tickets
 */
router.get('/all', TicketController.getTickets);

/**
 * @swagger
 * /ticket/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     tags:
 *       - Ticket
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ticket to get
 *     responses:
 *       200:
 *         description: Ticket details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       404:
 *         description: Ticket not found
 */
router.get(
    '/:id',
    [
        param('id').isMongoId().withMessage('Invalid ticket ID format'),
    ],
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    TicketController.getATicket
);

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
 *       201:
 *         description: Ticket booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.post(
    '/book-ticket',
    [
        check('movieId').isMongoId().withMessage('Invalid movie ID format'),
        check('userId').isMongoId().withMessage('Invalid user ID format'),
        check('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    ],
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    TicketController.bookTicket
);

export default router;
