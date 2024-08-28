import { Schema, model, Document, Types } from 'mongoose';

export interface ITicket extends Document {
    movie_id: Types.ObjectId;
    user_id: Types.ObjectId;
    price: number;
    time_booked: Date;
    status: string;
    payment_reference?: string;
}

const ticketSchema = new Schema({
    movie_id: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true },
    time_booked: { type: Date, default: Date.now },
    status: { type: String, enum: ['booked', 'paid', 'canceled'], default: 'booked' },
    payment_reference: { type: String },
});

export const Ticket = model<ITicket>('Ticket', ticketSchema);
