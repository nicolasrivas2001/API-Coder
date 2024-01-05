import { Router } from "express";
import { generateProduct } from "../faker.js";

const router = Router()

router.get("/", (req,res) => {
    const products = [];
    for (let i = 0; i < 100; i++) {
        const product = generateProduct();
        products.push(product);
    }
    res.json({ products });
});

export default router;

