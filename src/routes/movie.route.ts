import express from 'express';
import { MovieController } from "../controllers/movie.controller";

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
router.get('/:id', MovieController.getAMovie);

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
router.post('/new', MovieController.createMovie);

export default router;
