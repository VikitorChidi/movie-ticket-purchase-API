import express from 'express';
import {UserController} from "../controllers/user.controller";

const router = express.Router();

/**
 * Get users
 */
router.get('/all', UserController.getUsers)

/**
 * Get user by id
 */
router.get('/:id', UserController.getAUser)

/**
 * Create a user
 */
router.post('/new', UserController.createUser)

export default router;
