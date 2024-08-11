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
    if (!newCart) res.status(400).json({ msg: "Bad request" });
    res.status(200).json(newCart);
  } catch (error) {
    next(error);
  }
};
export const addProductToCart = async (req, res, next) => {
  try {
    //const { cid, pid } = req.params;
    let { quantity } = req.body;
    const { pid } = req.params;
    const { cart } = req.user;

    if(!quantity || quantity < 1) quantity = 1;

    const newProdToUserCart = await service.addProduct(
      cart,
      pid,
      quantity
    )
    
    //const cart = await service.addProduct(cid, pid, quantity);
    if (!newProdToUserCart) res.status(400).json({ msg: "Error add product to cart" });
    else res.status(200).json(newProdToUserCart);
  } catch (error) {
    next(error);
  }
};

export const updateProductQuantities = async (req, res, next) => {
  try {
    const {cid} = req.params;
    const {products} = req.body;

    const updatedCart = await service.updateProductQuantities(cid, products);

    if(!updatedCart) res.status(400).json({ msg: "Bad request" });
    res.status(200).json(updatedCart);
  } catch (error) {
    next(error);
  }
};

export const delProductToCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await service.delProduct(cid, pid);

    if(!cart) res.status(400).json( { msg: 'Cart or Product not found' });
    return res.status(200).json(cart);
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