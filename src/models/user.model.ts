import {Document, model, Schema} from 'mongoose';

export interface IUser extends Document {
    name: string;
    phone_number: string;
    email: string;
}

const userSchema = new Schema({
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true }
});

export const User = model<IUser>('User', userSchema);
