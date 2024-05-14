import express from 'express';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';

const app = express(); //app es igual a la ejecucion de express
const PORT = 8080;

//permite realizar consultas en la URL (req.query)
app.use(express.urlencoded({ extended:true}));
//permite manejar archivos JSON
app.use(express.json());
//permite simplificar lo que sigue luego del slash(/) y no usarlo en app.js (server)
app.use('/api/products', productRouter);
app.use('/api//cart', cartRouter);

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
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