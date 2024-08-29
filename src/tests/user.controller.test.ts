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
 * Test for the User controller
 */
describe('User Endpoints', () => {
    it('should create a user', async () => {
        const res = await request(app)
            .post('/api/v1/user/new')
            .send({
                name: 'John Doe',
                email: 'john.doe@gmail.com',
                phone_number: '+2348161435671'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('name', 'John Doe');
        expect(res.body).toHaveProperty('email', 'john.doe@gmail.com');
    });

    it('should get all users', async () => {
        const res = await request(app).get('/api/v1/user/all');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should get a user by ID', async () => {
        const user = await request(app)
            .post('/api/v1/user/new')
            .send({
                name: 'Jane Doe',
                email: 'jane.doe@gmail.com',
                phone_number: '+2348161435672'
            });

        const res = await request(app).get(`/api/v1/user/${user.body._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', user.body._id);
        expect(res.body).toHaveProperty('name', 'Jane Doe');
    });
});
