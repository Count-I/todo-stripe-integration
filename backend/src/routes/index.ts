import { Router } from "express";
const router = Router();
const paymentRouter = require('./payment.route')
const productRouter = require('./product.route')

//put here your todo routes

router.use('/todopay', paymentRouter);
router.use('/product', productRouter);

module.exports = router;