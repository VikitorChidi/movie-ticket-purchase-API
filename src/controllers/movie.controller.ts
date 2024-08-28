import {Request, Response} from 'express';
import {HttpStatusCode} from "axios";
import {Movie} from "../models/movie.model";

export class MovieController {
    static async createMovie(req: Request, res: Response) {
        try{
            const newMovie = await Movie.create(req.body);
            res.status(HttpStatusCode.Created).json(newMovie)
        } catch (err: any) {
            console.error(err);
            res.status(HttpStatusCode.InternalServerError).json({
                statusCode: HttpStatusCode.InternalServerError,
                message: `${err.message}`,
            })
        }
    }

    static async getMovies(req: Request, res: Response) {
        try{
            res.status(HttpStatusCode.Ok).json(await Movie.find().exec());
        } catch (err: any) {
            console.error(err);
            res.status(HttpStatusCode.InternalServerError).json({
                statusCode: HttpStatusCode.InternalServerError,
                message: `${err.message}`,
            })
        }
    }

    static async getAMovie(req: Request, res: Response) {
        try {
            const movie = await Movie.findById(req.params.id)

            // Log the retrieved movie for debugging purposes
            console.log("Retrieved Movie:", movie);

            if (!movie) {
                return res.status(HttpStatusCode.NotFound).json({ message: "Movie not found" });
            }

            res.status(HttpStatusCode.Ok).json(movie);
        } catch (err: any) {
            console.error(err);
            res.status(HttpStatusCode.InternalServerError).json({
                statusCode: HttpStatusCode.InternalServerError,
                message: `${err.message}`,
            })
        }
    }
}
