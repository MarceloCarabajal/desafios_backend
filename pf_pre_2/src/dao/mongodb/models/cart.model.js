import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: [
        {
            _id: false,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                default: []
            },
            quantity: {
                type: Number, 
                default: 1
            }
        }
    ]
});

cartSchema.pre('find', function(){
    this.populate('products.product');
})

export const CartModel = mongoose.model(
    cartCollection,
    cartSchema
);