import express, { Request, Response, NextFunction } from 'express';
import { MovieController } from "../controllers/movie.controller";
import { check, param, validationResult } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * /movie/all:
 *   get:
 *     summary: Get all movies
 *     tags:
 *       - Movie
 *     responses:
 *       200:
 *         description: A list of all movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.get('/all', MovieController.getMovies);

/**
 * @swagger
 * /movie/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags:
 *       - Movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to retrieve
 *     responses:
 *       200:
 *         description: The movie details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found
 */
router.get(
    '/:id',
    [
        param('id').isMongoId().withMessage('Invalid movie ID format'),
    ],
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    MovieController.getAMovie
);

/**
 * @swagger
 * /movie/new:
 *   post:
 *     summary: Create a new movie
 *     tags:
 *       - Movie
 *     requestBody:
 *       description: Movie details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post(
    '/new',
    [
        check('name').notEmpty().withMessage('Name is required'),
        check('release_date').isISO8601().withMessage('Invalid release date format'),
        check('duration').isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
        check('genre').notEmpty().withMessage('Genre is required'),
    ],
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    MovieController.createMovie
);

export default router;
