import { Router } from "express";
import { createProduct, deleteProduct, findAll, findById, updateById } from "../controllers/products.controller.js";
import passport from "passport";
import { authMiddleware } from "../middlewars/auth.middleware.js";

const router = Router()

router.get("/", findAll);
  
router.get("/:pid", findById);

router.put("/:pid", /*passport.authenticate("jwt", {session: false}), authMiddleware(["Admin"]),*/ updateById);

router.post("/", /*passport.authenticate("jwt", {session: false}), authMiddleware(["Admin"]),*/ createProduct);
  
router.delete("/:idProduct",/* passport.authenticate("jwt", {session: false}), authMiddleware(["Admin"]),*/ deleteProduct);
  
export default router;