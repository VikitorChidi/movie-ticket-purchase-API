import swaggerJsdoc from 'swagger-jsdoc';
import config from "./index";

const {baseUrl, port} = config()

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Movie Ticket Purchase API',
            version: '1.0.0',
            description: 'API documentation for the Movie Ticket Purchase API',
        },
        servers: [
            {
                url: `${baseUrl}:${port}`,
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                Ticket: {
                    type: 'object',
                    properties: {
                        ticket_id: {
                            type: 'number',
                            description: 'The unique identifier for the ticket',
                        },
                        price: {
                            type: 'string',
                            description: 'The price of the ticket in the format 3500NGN',
                        },
                        movies: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'number',
                                        description: 'The ID of the movie',
                                    },
                                    name: {
                                        type: 'string',
                                        description: 'The name of the movie',
                                    },
                                },
                            },
                            description: 'List of movies associated with the ticket',
                        },
                        user: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    description: 'The name of the user',
                                },
                                phone_number: {
                                    type: 'string',
                                    description: 'The phone number of the user',
                                },
                            },
                            description: 'User details',
                        },
                        time_booked: {
                            type: 'string',
                            format: 'date-time',
                            description: 'The time when the ticket was booked',
                        },
                    },
                    required: ['ticket_id', 'price', 'movies', 'user', 'time_booked'],
                    example: {
                        ticket_id: 129,
                        price: '3500NGN',
                        movies: [
                            {
                                id: 12,
                                name: 'Endgame',
                            },
                        ],
                        user: {
                            name: 'John Doe',
                            phone_number: '2349901234046',
                        },
                        time_booked: '2024-06-01T09:10:53Z',
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'], // Path to your API files
};


export default swaggerJsdoc(swaggerOptions);

