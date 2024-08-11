import * as service from "../services/ticket.service.js";
import * as userController from "./user.controllers.js";

//Crear un nuevo Ticket
export const createTicket = async (req, res, next) => {
    try {
        const { amount, purchaser } = req.body;
        
        const user = userController.current();
        console.log(user);
        

        if(!amount || !purchaser) {
            return res.status(400).json({ msg: "Amount and purchaser are required" });
        }

        //Crear un nuevo ticket
        const newTicket = {
            amount,
            purchaser,
        };

        const ticket = await service.createTicket(newTicket);

        res.status(201).json({ msg: "Ticket created successfully", ticket })
    } catch (error) {
        next(error);
    }
};

//Obtener tickets por ID

export const getTicketById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ticket = await service.getTicketsById(id);

        if(!ticket) {
            return res.status(400).json({ msg: "Ticket ID is required" });
        }

        if(!ticket) {
            return res.status(404).json({ msg: "Ticket not found" });
        }

        res.status(200).json({ msg: "Ticket retrieved successfully", ticket })
    } catch (error) {
        next(error);
    }
};

//Obtener tickets por usuario

export const getTicketsByUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if(!userId) {
            return res.status(400).json({ msg: "User ID is required" });
        }

        const tickets = await service.getTicketsByUser(userId);

        if(!tickets || tickets.length === 0) {
            return res.status(404).json({ msg: "No tickets found for this user" });
        }

        res.status(200).json({ msg: "Tickets retrieved successfully", tickets })
    } catch (error) {
        next(error);
    }
};