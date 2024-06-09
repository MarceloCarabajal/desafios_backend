import mongoose from "mongoose";

const productCollection = 'product';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 30, index: true},
    description: { type: String, required: true, index: true},
    price: { type: Number, required: true },
    img: [String],
    code: { type: String },
    stock: { type: Number, required: true, unique: true },
    category: {
        type: String,
        enum: {
            values: [
                'Periféricos',
                'Laptop',
                'PC',
                'Accesorios',
                'Tablets',
                'Celulares',
                'Otros'
            ],
            message: '{VALUE} no es una categoría válida',
        },
        require: true,
        index: true,
    },
    status: {type: Boolean, default: true},
});

export const ProductModel = mongoose.model(
    productCollection, 
    productSchema
);

