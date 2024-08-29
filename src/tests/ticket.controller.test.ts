import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app'; // Your Express app

/**
 * Database setup and teardown
 */
beforeAll(async () => {
    if(mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://localhost:27017/movie_ticket_test')
    }
});

afterAll(async () => {
    await mongoose.connection.dropDatabase(); // Clean up the test DB
    await mongoose.connection.close(); // Close the connection
});

/**
 * Test for the Ticket controller
 */
describe('Ticket Endpoints', () => {
    it('should book a ticket', async () => {
        const movie = await request(app)
            .post('/api/v1/movie/new')
            .send({
                name: 'Endgame',
                description: 'Marvel movie',
                genre: 'Action',
                duration: 120,
                release_date: '2020-01-01T12:00:00.000Z',
            });

        const user = await request(app)
            .post('/api/v1/user/new')
            .send({
                name: 'John Doe',
                email: 'john.doe@gmail.com',
                phone_number: '+2348161435671',
            });

        const res = await request(app)
            .post('/api/v1/ticket/book-ticket')
            .send({
                movie_id: movie.body._id,
                user_id: user.body._id,
                price: 3500,
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('ticket_id');
        expect(res.body).toHaveProperty('price', '3500NGN');
        expect(res.body).toHaveProperty('user');
        expect(res.body.user).toHaveProperty('name', 'John Doe');
    });
});
