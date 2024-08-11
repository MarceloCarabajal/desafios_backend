import persistence from '../persistence/dao/factory.js';
const { ticketDao } = persistence;

export const create = async (ticket) => {
    try {
        return await ticketDao.create(ticket);
    } catch (error) {
        throw new Error(error);
    }
};

export const getTicketsById = async (ticket) => {
    try {
        return await ticketDao.getById(ticket);
    } catch (error) {
        throw new Error(error);
    }
};

export const getTicketsByUser = async (userId) => {
    try {
        return await ticketDao.getByUserId(userId);
    } catch (error) {
        throw new Error(error.message);
    }
};

