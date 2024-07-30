// import UserDao from "../dao/mongodb/user.dao.js";
// const userDao = new UserDao();

import persistence from "../persistence/dao/factory.js";
const { userDao, cartDao } = persistence; 
import jwt from 'jsonwebtoken';
import config from '../../envConfig.js'

export const generateToken = (user, time = '1h') => {
    const payload = {
        userId: user._id
    };

    const token = jwt.sign(payload, config.SECRET_KEY, {
        expiresIn: time
    });

    return token;
};

export const register = async (user) => {
    try {
        // Verifico si el usuario ya existe
        const { email, password } = user;
        const existingUser = await userDao.getByEmail(email);
        if(existingUser) return null;

        // Registro nuevo usuario y carrito
        const cartUser = await cartDao.create();
        return await userDao.register(user);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const login = async( email ) => {
    try {
        return await userDao.getByEmail(email);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getById = async (id) => {
    try {
        return await userDao.getById(id);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getByEmail = async (email) => {
    try {
        return await userDao.getByEmail(email);
    } catch (error) {
        throw new Error(error.message);
    }
}