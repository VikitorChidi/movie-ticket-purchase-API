import express, { Request, Response, NextFunction } from 'express';
import { UserController } from "../controllers/user.controller";
import { check, param, validationResult } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: A list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/all', UserController.getUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: The user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get(
    '/:id',
    [
        param('id').isMongoId().withMessage('Invalid user ID format'),
    ],
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    UserController.getAUser
);

/**
 * @swagger
 * /user/new:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - User
 *     requestBody:
 *       description: User details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post(
    '/new',
    [
        check('name').notEmpty().withMessage('Name is required'),
        check('phone_number')
            .notEmpty().withMessage('Phone number is required')
            .matches(/^\+?[1-9]\d{1,14}$/).withMessage('Invalid phone number format'),
        check('email').isEmail().withMessage('Invalid email format'),
    ],
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    UserController.createUser
);

export default router;
