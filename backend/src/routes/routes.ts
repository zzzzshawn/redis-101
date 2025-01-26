import { Router } from "express";
import redis from "../redis";

const router = Router();

router.get("/", async (req, res) => {
    await redis.lPush("messages", "ssup nigga");
    res.json({msg: "ssup nigga"})
});

export default router
