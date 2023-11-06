import { Router } from "express";
import { usersManager } from "../db/managers/usersManager.js";
import { productsManager } from "../db/managers/productsManager.js";

const router = Router()

router.post("/signup", async(req,res)=>{
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: "Some data is missing" });
    }
    try {
        const createdUser = await usersManager.createOne(req.body)
        res.status(200).json({message:"User created", user:createdUser})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.post("/login", async(req,res)=>{
    const { email, password } = req.body;
    if ( !email || !password) {
        return res.status(400).json({ message: "Some data is missing" });
    }
    try {
        const user = await usersManager.findByEmail(email)
        console.log("user",user)
        if (!user){
            return res.redirect("/signup")
        }
        
        const isPasswordValid = password === user.password
        if(!isPasswordValid){
            return res.status(401).json({message:"Password is not valid"})
        }
        const sessionInfo = email === "adminCoder@coder.com" && password === "adminCod3r123" ?
        {email, first_name:user.first_name, isAdmin: true}
        : {email, first_name:user.first_name, isAdmin: false}
        
        req.session.user = sessionInfo
        const products = await productsManager.findAll({limit:10, page:1, sort:{}, query:{} }).lean()
        const docs = products.payload.docs
        res.render("products",{products: docs});
    } catch (error) {
        res.status(500).json({error:error})
    }
})

export default router;

