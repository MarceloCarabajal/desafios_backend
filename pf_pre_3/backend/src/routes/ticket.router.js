import { Router } from 'express';
import * as controller from '../controllers/ticket.controllers.js'
import { checkAuth } from '../middlewares/authJwt.js';

const router = Router();

router.post("/purchase", [checkAuth], controller.createPurchaseTicket);
router.get("/", [checkAuth], controller.getTicketById);
//router.get("/", [checkAuth], controller.getTicketsByUser);

export default router;