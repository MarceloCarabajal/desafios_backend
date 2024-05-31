import mongoose from "mongoose";

const productCollectionName = 'product';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 30},
    description: { type: String, required: true},
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
});

export const ProductModel = mongoose.model(
    productCollectionName, 
    productSchema
);

