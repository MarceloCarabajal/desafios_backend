import { ProductModel } from "./models/product.model.js";
export default class ProductDaoMongoDB {
    // constructor(collection, schema) {
    //     this.collection = model(collection, schema);
    // }

    getAll = async (page = 1, limit = 10, name, sort) => {
        try {
            const filter = name ? { 'name': name} : {};
            let sortOrder = {};
            if(sort) sortOrder.price = sort === 'asc' ? 1: sort === 'desc' ? -1 : null;
            const response = await ProductModel.paginate(filter, { page, limit, sort });
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    getById = async (id) => {
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    create = async (product) => {
        try {
            return await ProductModel.create(product);
        } catch (error) {
            throw new Error(error);
        }
    }

    update = async (id, obj) => {
        try {
            return await ProductModel.findByIdAndUpdate(id, obj, {new: true});
        } catch (error) {
            throw new Error(error);
        }
    }

    delete = async (id) => {
        try {
            return await ProductModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error);
        }
    }


}