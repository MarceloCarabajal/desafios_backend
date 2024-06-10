import * as service from "../services/cart.services.js";

export const getAll = async (req, res, next) => {
  try {
    const carts = await service.getAll();
    res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await service.getById(cid);
    if (!cart) res.status(404).json({ msg: "cart not found" });
    else res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const cartData = req.body;
    const newCart = await service.create(cartData);
    if (!cart) res.status(400).json({ msg: "Bad request" });
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};
export const addProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    let { quantity } = req.body;
    const cart = await service.addProduct(cid, pid, quantity);
    if (!cart) res.status(400).json({ msg: "Bad request" });
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const addManyProduct = async (req, res, next) => {
  try {
    const {cid} = req.params;
    const cart = await service.addManyProduct(cid, req.body);
    if(!cart) res.status(400).json({ msg: "Bad request" });
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const delProduct = async () => {
  try {
    const { cid, pid } = req.params;
    const cart = await service.delProduct(cid, pid);
    if(!cart) res.status(400).json( { msg: 'Bad request' });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await service.remove(cid);
    if (!cart) res.status(404).json({ msj: "Error removing cart" });
    else res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const cleanCart =async (req, res, next ) => {
  try {
    const { cid } = req.params;
    const cart = await service.cleanCart(cid);
    if (!cart) res.status(404).json({ msj: "Error cleaning cart" });
    else res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
}