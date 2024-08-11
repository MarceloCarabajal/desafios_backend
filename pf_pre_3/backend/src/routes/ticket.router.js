import { Router } from 'express';
import * as controller from '../controllers/ticket.controllers.js'
import { checkAuth } from '../middlewares/authJwt.js';

const router = Router();

router.post("/", [checkAuth], controller.createTicket);

export default router;