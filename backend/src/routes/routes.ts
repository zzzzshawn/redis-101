import { Router } from "express";
import redis from "../redis";

const router = Router();

router.get("/", async (req, res) => {
  res.json({ msg: "get all todos route" });
});

router.post("/", async (req, res) => {
  const { todo } = req.body;

  if (!todo) res.json({ success: false, data: "Missing todo" });

  try {
    await redis.lPush("todos", JSON.stringify(todo));
    res.json({ success: true, data: todo });
  } catch (error) {
    console.log(error);
    res.json({ success: false, data: error });
  }
});

export default router;
