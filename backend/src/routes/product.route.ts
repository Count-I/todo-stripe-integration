import { Router } from "express";
import { getProductsHandler } from "../services/product.service";

const router = Router();

router.get('/getAll', getProductsHandler);

module.exports = router;