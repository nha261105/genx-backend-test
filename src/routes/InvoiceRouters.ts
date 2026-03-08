import { Router } from "express";

import { InvoiceController } from "../controllers/InvoiceController.js";


const router = Router()

router.post('/calc', InvoiceController);

export default router;