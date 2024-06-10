import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDB {
  getAll = async () => {
    try {
      return await CartModel.find();
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const response = await CartModel.findById(id).populate('products.product');
      if (!response) {
        throw new Error(`Cart with id ${id} not found`);
      } else {
        return response;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  create = async (cart) => {
    try {
      return await CartModel.create(cart);
    } catch (error) {
      throw new Error(error);
    }
  };

  addProduct = async (id, productId, quantity) => {
    try {
      const cart = await CartModel.findById(id);
      if (!cart) throw new Error(`Cart with id ${id} not found`);

      const existingProduct = cart.products.find(p => p.product.toString() === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  };

  addManyProduct = async (cid, products) => {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) throw new Error(`Cart with id ${cid} not found`);

      products.forEach(({ productId, quantity }) => {
        const existingProduct = cart.products.find(p => p.product.toString() === productId);
        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.products.push({ product: productId, quantity });
        }
      });

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  };

  delProduct = async (id, productId) => {
    try {
      const cart = await CartModel.findById(id);
      if (!cart) throw new Error(`Cart with id ${id} not found`);

      cart.products = cart.products.filter(p => p.product.toString() !== productId);

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (id) => {
    try {
      const cart = await CartModel.findByIdAndDelete(id);
      if (!cart) {
        throw new Error(`Cart with id ${id} not found`);
      }
      return cart;
    } catch (error) {
      throw new Error(`Error deleting cart: ${error.message}`);
    }
  };

  cleanCart = async (cid) => {
    try {
      const clearCart = await CartModel.findByIdAndUpdate(
        cid,
        { $set: { products: [] } },
        { new: true }
      );
      return clearCart;
    } catch (error) {
      throw new Error(error)
    }
  }
}
