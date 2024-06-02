import { initMongoDB } from './dao/mongodb/connection.js';
import express from 'express';
import morgan from 'morgan'
import productsRouter from './routes/producst.router.js';
import {errorHandler} from './middlewares/errorHandler.js';
import 'dotenv/config';

//express
const app = express(); //app es igual a la ejecucion de express
const PORT = 8080;
app.listen(PORT, () => console.log('listening on port ' + PORT));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use("/products", productsRouter)

//app.use("/products", productsRouter);

//middlewares
app.use(errorHandler);

if(process.env.PERSISTENCE === 'MONGO') initMongoDB();