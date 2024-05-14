import { Router } from 'express';
import ProductManager from '../manager/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./src/data/products.json');

//obtengo todos los productos
router.get('/', async(req, res) => {
    try {
        const products = await productManager.getProducts();
        let {limit} = req.query;
        let datos;
        if(limit) {
            datos = products.slice(0, parseInt(limit));
        } else {
            datos = products;
        }
        res.status(200).json(datos)
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
})

//obtengo un producto por id
router.get('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await productManager.getProductById(parseInt(id));
        if(!product){
            res.status(404).json({msg: 'Product not found'});  
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
})

//agregar producto a mi array
router.post('/', async(req, res)=> {
    try {
        //console.log(req.body);
        const product = await productManager.addProduct(req.body);
        if(!product) {
            res.status(400).json({msg: 'Product already exists'});
        } else {
            res.status(201).json(product);
        }
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
})

//actualizar producto por id y objeto
router.put('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const productUpd = await productManager.updateProduct(parseInt(id), req.body);
        if(!productUpd){
            res.status(404).json({msg: 'Error updating product'});
        } else {
            res.status(200).json(productUpd);
        }
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const productDel = await productManager.deleteProduct(parseInt(id));
        if(!productDel){
            res.status(404).json({msg: 'Error deleting product'});
        } else {
            res.status(200).json({msg: `Product id: ${id} deleted`});
        }
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
})

export default router;