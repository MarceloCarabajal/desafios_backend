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

//obtengo todos los productos
app.get('/products', async(req, res) => {
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
app.get('/products/:id', async(req, res) => {
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
app.post('/products', async(req, res)=> {
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
app.put('/products/:id', async(req, res) => {
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

app.delete('/products/:id', async(req, res) => {
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


/*
//json para probar
{
    "title":"Mouse",
    "description": "Mouse Redragon", 
    "price": 40000, 
    "thumbnail":"https://redragon.es/content/uploads/2021/04/GRIFFIN-B.png", 
    "code":"30", 
    "stock": 10
},
{
    "title":"Teclado",
    "description": "Teclado Redragon", 
    "price": 60000, 
    "thumbnail":"https://redragon.es/content/uploads/2021/05/K552-KR-SPS-KUMARA-RAINBOW-SPAIN1.png", 
    "code":"20", 
    "stock": 10
},
{
    "title":"Laptop",
    "description": "Laptop Dell", 
    "price": 900000, 
    "thumbnail":"https://www.nextclick.com.ar/Temp/App_WebSite/App_PictureFiles/Items/0196804274027_800.jpg", 
    "code":"10", 
    "stock": 5
}

*/