import express from 'express';
import {MovieController} from "../controllers/movie.controller";

const router = express.Router();

/**
 * Get movies
 */
router.get('/all', MovieController.getMovies)

/**
 * Get movie by id
 */
router.get('/:id', MovieController.getAMovie)

/**
 * Create a movie
 */
router.post('/new', MovieController.createMovie)

export default router;
