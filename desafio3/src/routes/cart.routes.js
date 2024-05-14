import { Router } from "express";
const router = Router();

const cart = [];

router.get('/', (req, res) => {
    res.json(cart);
})

router.post('/', (req, res) => {
    cart.push(req.body);
    res.json({msg: 'Carrito agregado con exito'});
})

export default router;