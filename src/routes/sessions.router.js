import { Router } from "express";
import { generateToken } from "../utils.js";
import passport from "passport";
import UserResponse from "../dto/users-response.dto.js"
import {usersManager} from "../dao/mongo/users.mongo.js";

const router = Router()

router.get("/current", passport.authenticate("jwt", {session: false}), async(req,res)=>{
    const user = req.user
    console.log("user",user)
    const userDTO = new UserResponse(user)
    res.json({userDTO})
    
})

router.post("/signup",passport.authenticate("signup"), async(req,res)=>{
    res.json({ message: "Signed up" });
})

router.post("/login",passport.authenticate("login"), async(req,res)=>{
    const {email} = req.body
    const user = await usersManager.findByEmail(email)
    console.log("user",user)
    const token = generateToken({user});
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

