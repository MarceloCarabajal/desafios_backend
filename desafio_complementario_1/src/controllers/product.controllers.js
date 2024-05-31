import ProductManager from "../dao/mongodb/product.dao";
const productManager = new ProductManager();

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await productManager.getAll();
        res.json(products);
    } catch (error) {
        next(error);
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const { id }  = req.params;
        const product = await productManager.getById(id);
        if(!product) res.json({msg: 'Product not found'});
        else res.json(product);
    } catch (error) {
        next(error);
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const newProduct = await productManager.create(req.body);
        if(!newProduct) res.json({msg: 'Error creating product'});
        else res.json(newProduct);
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodUpdate = await productManager.update(id, req.body);
        if(!prodUpdate) res.json({msg: 'Error update product'});
        else res.json(prodUpdate);
    } catch (error) {
        
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodDelete = await productManager.delete(id);
        if(!prodDelete) res.json({msg: 'Error deleting product'});
        else res.json(prodDelete);
    } catch (error) {
        next(error);
    }
};