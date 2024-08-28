import {Request, Response} from "express";
import {HttpStatusCode} from "axios";
import {User} from "../models/user.model";

export class UserController {
    static async createUser(req: Request, res: Response) {
        try{
            const newUser = await User.create(req.body);
            res.status(HttpStatusCode.Created).json(newUser)
        } catch (err: any) {
            console.error(err)
            res.status(HttpStatusCode.InternalServerError).json({
                statusCode: HttpStatusCode.InternalServerError,
                message: `${err.message}`,
            })
        }
    }

    static async getUsers(req: Request, res: Response) {
        try{
            res.status(HttpStatusCode.Ok).json(await User.find())
        } catch (err: any) {
            console.error(err)
            res.status(HttpStatusCode.InternalServerError).json({
                statusCode: HttpStatusCode.InternalServerError,
                message: `${err.message}`,
            })
        }
    }

    static async getAUser(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.id)
            res.status(HttpStatusCode.Ok).json(user)
        } catch (err: any) {
            console.error(err)
            res.status(HttpStatusCode.InternalServerError).json({
                statusCode: HttpStatusCode.InternalServerError,
                message: `${err.message}`,
            })
        }
    }
}
