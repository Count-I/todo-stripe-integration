import { NextFunction, Request, Response } from "express";
import { products } from "../seeders/products";

export const getProductsHandler = (
    req: Request,
    res: any,
    next: NextFunction
) => {
    try {
        const _products = JSON.stringify(Object.fromEntries(products))
        res.status(201).json({
            data: _products,
        })
    } catch (error:any) {
        res.status(500).json({
            Error: error.message
        })
        next(error);
    }
}