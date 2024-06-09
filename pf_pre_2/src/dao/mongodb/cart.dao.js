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
      const { products } = await CartModel.findById(id, { products: true});

      const productAdded = products.some(
        (element) = element.product.toString() === productId
      );
      if (!productAdded) {
        const addedProduct = await CartModel.updateOne(
          { _id: id },
          { $push: { products: { product: productId, quantity: quantity } } },
          { new: true }
        );
        if( !addedProduct.modifiedCount) return null;
        else return await CartModel.findById(id)
      } else {
        const addProduct = await CartModel.updateOne(
          {_id: id, "products.product": productId },
          {$set: { "products.$.quantity": quantity } },
          {new: true}
        );
        if(!addedProduct.modifiedCount) return null;
        else return await CartModel.findById(id);
      }
    } catch (error) {
      throw new Error (error);
    }
  };

  addManyProduct = async (cid, products) => {
    try {
      const repsonse = await CartModel.findByIdAndUpdate(cid, products, {
        new: true,
      });
    } catch (error) {
      throw new Error (error);
    }
  }

  delProduct = async (id, idProduct) => {
    try {
      const delProd = await CartModel.updateOne(
        {
          _id: id,
        },
        { $pull: {products: {product: productId}}}
      );
      if(!delProd.modifiedCount) return;
      else return delProd;
    } catch (error) {
      throw new Error (error);
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

  cleanCart = async () => {
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
