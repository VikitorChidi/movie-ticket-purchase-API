import { config } from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file
config();

export const dbConfig = {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/movie_ticket',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(dbConfig.uri);
        console.log('Database Connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

if (process.env.NODE_ENV === 'development') {
    console.log(dbConfig);
}
