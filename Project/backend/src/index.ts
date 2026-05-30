import express, { Request, Response } from "express";
import "dotenv/config";
import morgan from "morgan";
import authRouter from "./modules/auth.js";
import userRouter from "./modules/users.js"
import achievementRouter from "./modules/achievements.js"


const app = express();
const PORT = process.env.PORT;
if (!PORT) throw new Error('PORT is missing in your env file');

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRouter);

app.use("/api/users", userRouter)

app.use("/api/achievements", achievementRouter)

app.get("/", (_req, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:%d", PORT);
});