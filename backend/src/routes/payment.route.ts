import { Router } from "express";
import { paymentHandler } from "../services/payment.service";
const router = Router();

//put here your todo payment endpoints

router.post('/create-payment-intent', paymentHandler);

//you can also create middelwares to check some options like permissions or roles before call de paymentHandler service

module.exports= router;