import { createClient } from "redis";
import { PrismaClient } from "@prisma/client";


const redis = createClient();
const prisma = new PrismaClient();

(async () => {
  try {
    await redis.connect();
    redis.on("error", console.error);

    while (true) {
      const qTodo = await redis.brPop("todos", 0);
      if (qTodo && qTodo.element) {
        const todo = JSON.parse(qTodo.element);
        const newTodo = await prisma.todos.create({
            data: {
                todo
            }
        })
        console.log(newTodo);
      } else {
        console.log("no todo");
      }
    }
  } catch (error) {
    console.log(error);
  }
})();

