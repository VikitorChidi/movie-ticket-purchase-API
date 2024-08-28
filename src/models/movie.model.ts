import { Schema, model, Document } from 'mongoose';

export interface IMovie extends Document {
    name: string;
    description: string;
    release_date: Date;
    duration: number;
    genre: string;
}

const movieSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    release_date: { type: Date, required: true },
    duration: { type: Number, required: true },
    genre: { type: String, required: true },
});

export const Movie = model<IMovie>('Movie', movieSchema);
