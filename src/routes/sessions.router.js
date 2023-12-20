import { Router } from "express";
import { generateToken } from "../utils.js";
import passport from "passport";

const router = Router()

router.get("/current", passport.authenticate("jwt", {session: false}), async(req,res)=>{
    const user = req.user
    res.json({user})
    
})

router.post("/signup",passport.authenticate("signup"), async(req,res)=>{
    res.json({ message: "Signed up" });
})

router.post("/login",passport.authenticate("login"), async(req,res)=>{
    const {first_name,email} = req.body
    const token = generateToken({first_name,email});
    res.cookie("token", token, { maxAge: 60000, httpOnly: true }).send("Welcome");
})

//github

router.get("/auth/github",
    passport.authenticate("github", {scope: ["user:email"]})
)

router.get("/callback",
    passport.authenticate("github"), (req,res)=>{
        res.send("Probando")
    }
)

export default router;

