import mongoose from "mongoose";

export interface IBookTicketInterface {
    movie_id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    price: number;
}
