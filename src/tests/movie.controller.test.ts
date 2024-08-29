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
 * Test for the Movie controller
 */
describe('Movie Endpoints', () => {
    it('should create a movie', async () => {
        const res = await request(app)
            .post('/api/v1/movie/new')
            .send({
                name: 'Endgame',
                description: 'Marvel movie',
                genre: 'Action',
                duration: 120,
                release_date: '2020-01-01T12:00:00.000Z',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('name', 'Endgame');
    });

    it('should get all movies', async () => {
        const res = await request(app).get('/api/v1/movie/all');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should get a movie by ID', async () => {
        const movie = await request(app)
            .post('/api/v1/movie/new')
            .send({
                name: 'Black Panther',
                description: 'Marvel movie',
                genre: 'Action',
                duration: 134,
                release_date: '2018-02-16T12:00:00.000Z',
            });

        const res = await request(app).get(`/api/v1/movie/${movie.body._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', movie.body._id);
        expect(res.body).toHaveProperty('name', 'Black Panther');
    });
});
