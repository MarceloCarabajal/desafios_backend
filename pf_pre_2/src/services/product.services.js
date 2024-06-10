import ProductDaoMongoDB from "../dao/mongodb/product.dao.js";
const prodDao = new ProductDaoMongoDB();

// import { __dirname } from "../utils.js";
// import ProductDaoFS from "../dao/filesystem/product.dao.js";
// const prodDao = new ProductDaoFS(`${__dirname}/data/products.json`);

export const getAll = async(title, page, limit, sort) => {
    try {
        return await prodDao.getAll(title, page, limit, sort);
    } catch (error) {
        throw new Error(error);
    }
}

export const getAllWebSocket = async () => {
    try {
        return await prodDao.getAllWebSocket();
    } catch (error) {
        throw new Error(error);
    }
}

export const getAllWebSocketPaginated = async (title, page, limit, sort) => {
    try {
        return await prodDao.getAllWebSocketPaginated(title, page, limit, sort);
    } catch (error) {
        throw new Error(error);
    }
}

export const getById = async(productId) => {
    try {
        return await prodDao.getById(productId);
    } catch (error) {
        throw new Error(error);
    }
}

export const getByCategory = async (title, page, limit, sort) => {
    try {
        return await prodDao.getByCategory(title, page, limit, sort);
    } catch (error) {
        throw new Error(error);
    }
}

export const create = async(prod) => {
    try {
        return await prodDao.create(prod);
    } catch (error) {
        throw new Error(error);
    }
}

export const update = async(id, prod) => {
    try {
        return await prodDao.update(id, prod);
    } catch (error) {
        throw new Error(error);
    }
}

export const remove = async(id) => {
    try {
        return await prodDao.delete(id);
    } catch (error) {
        throw new Error(error);
    }
}

export const removeAll = async() => {
    try {
        return await prodDao.removeAll();
    } catch (error) {
        throw new Error(error);
    }
}