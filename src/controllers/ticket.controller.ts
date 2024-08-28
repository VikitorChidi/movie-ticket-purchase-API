import {Request, Response} from 'express';
import {HttpStatusCode} from "axios";
import {TicketService} from "../services/ticket.service";
import {Ticket} from "../models/ticket.model";

export class TicketController {
    static async bookTicket(request: Request, response: Response){
        try{
            const ticket = await TicketService.bookTicket(request.body);
            response.status(HttpStatusCode.Ok).json({
                statusCode: HttpStatusCode.Ok,
                message: 'Ticket booked successfully.',
                data: ticket
            })
        } catch (err: any){
            console.error(err);
            response.status(HttpStatusCode.InternalServerError).json({
                statusCode: HttpStatusCode.InternalServerError,
                message: `${err.message}`
            })
        }
    }

    static async getTickets(req: Request, res: Response) {
        try{
            res.status(HttpStatusCode.Ok).json(await Ticket.find())
        } catch (err: any) {
            console.error(err);
            res.status(HttpStatusCode.InternalServerError).json({
                statusCode: HttpStatusCode.InternalServerError,
                message: `${err.message}`,
            })
        }
    }

    static async getATicket(req: Request, res: Response) {
        try {
            res.status(HttpStatusCode.Ok).json(await Ticket.findById(req?.params?.id))
        } catch (err: any) {
            console.error(err);
            res.status(HttpStatusCode.InternalServerError).json({
                statusCode: HttpStatusCode.InternalServerError,
                message: `${err.message}`,
            })
        }
    }
}
