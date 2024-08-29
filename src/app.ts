import express from 'express';
import config from "./configs";
import {connectToDatabase} from "./configs/database";
import swaggerDocs from "./configs/swagger"
import swaggerUi from "swagger-ui-express";

/**
 * Routers
 */
import TicketRoutes from './routes/ticket.route'
import MovieRoutes from './routes/movie.route'
import UserRoutes from './routes/user.route'


/**
 * Get the port from the config file
 */
const { port, baseUrl} = config()

/**
 * Create an express app
 */
const app = express();

/**
 * Middlewares for the app
 */
app.use(express.json());

/**
 * Routes for the app
 */
app.use('/api/v1/ticket', TicketRoutes )
app.use('/api/v1/movie', MovieRoutes )
app.use('/api/v1/user', UserRoutes )


/**
 * Middleware to serve Swagger UI
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


/**
 * Connect to the database
 */
connectToDatabase()

/**
 * Start the server
 */
app.listen(port, async () => {
    console.log(`Server is running on ${baseUrl}:${port}`);
    console.log(`Swagger is running on ${baseUrl}:${port}/api-docs`);
})

export default app;
