import Stripe from "stripe";
import { products } from "../seeders/products";
const stripe: Stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

//put here all your payment services

export const paymentHandler = async (req: any, res: any) => {
    try {
        const session: any = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map((item: any) => {
                const storeItem: any = products.get(item.id);
                
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.CLIENT_URL}/success.html`,
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`
        })
        res.json({ url: session.url });
    } catch (err: any) {
        res.status(500).json({ message: "Something went wrong: " + err.message })
    }
}