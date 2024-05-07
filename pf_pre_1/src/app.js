import express from 'express';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import { __dirname } from './path.js';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express(); //app es igual a la ejecucion de express

const PORT = 8080

//convierto una carpeta en un recurso estatico
app.use('/static', express.static(__dirname + '/public'))
//segunda opcion (sin asignarle param)
//app.use(express.static(__dirname + '/public'));

//permite realizar consultas en la URL (req.query)
app.use(express.urlencoded({ extended:true}));
//permite manejar archivos JSON
app.use(express.json());
//para visualizar detalle de las request (solicitudes) del cliente
app.use(morgan('dev'));

//permite simplificar lo que sigue luego del slash(/) y no usarlo en app.js (server)
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

//Middlewares
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
})


/*
//json para probar productos
{
    "title":"Mouse",
    "description": "Mouse Redragon", 
    "category": "perifericos",
    "price": 40000, 
    "thumbnail":[], 
    "code":"30", 
    "stock": 10
},
{
    "title":"Teclado",
    "description": "Teclado Redragon", 
    "category": "perifericos",
    "price": 60000, 
    "thumbnail":[], 
    "code":"20", 
    "stock": 10
},
{
    "title":"Laptop",
    "description": "Laptop Lenovo", 
    "category": "laptops",
    "price": 900000, 
    "thumbnail":[], 
    "code":"10", 
    "stock": 5
}

*/

/*
//JSON para probar carritos
{
    "id":1,
    "products":[
        {
            "product":3,
            "quantity":4
        },
        {
            "product":1,
            "quantity":2
        }
    ]
},
{
    "id":2,
    "products":[]
}
 
 */