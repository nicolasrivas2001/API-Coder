import { Router } from "express";
import { logger } from "../logger.js";

const router = Router()

router.get("/", (req,res)=>{
    logger.fatal("Logger fatal")
    logger.error("Logger error")
    logger.warning("Logger warning")
    logger.info("Logger info")
    logger.http("Logger http")
    logger.debug("Logger debug")
    res.json("Logger funcionando correctamente")
});

export default router;

