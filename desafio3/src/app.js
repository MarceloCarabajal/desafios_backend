import express from 'express';
import ProductManager from './manager/ProductManager.js';

const productManager = new ProductManager('./src/manager/products.json');

const app = express(); //app es igual a la ejecucion de express
const PORT = 8080
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
})

//permite realizar consultas en la URL (req.query)
app.use(express.urlencoded({ extended:true}));
//permite manejar archivos JSON
app.use(express.json());

//ruta raiz
app.get('/', (req, res) => {
    res.send("Desafío #3 - Servidor Express.");
})

//consulta de productos
app.get('/products', async(req, res) => {
    try {
        const products = await productManager.getProducts();
        let {limit} = req.query;
        let datos;
        if(limit) {
            datos = products.slice(0, parseInt(limit));
            res.status(200).json(datos);
        } else {
            datos = products;
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await productManager.getProductById(parseInt(id))
        res.json(product)
    } catch (error) {
        res.status(404).json("Product not found",)
    }
})
