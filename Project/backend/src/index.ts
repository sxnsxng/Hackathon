  import express, { Request, Response } from "express";
  import "dotenv/config";
  import cors from "cors";
  import morgan from "morgan";
  import authRouter from "./modules/LoginRegistration/auth.js";
  import userRouter from "./modules/EditandDeleteUser/users.js";
  import achievementRouter from "./modules/Achievements/achievements.js";
  import gameplayRouter from "./modules/GamePlay/router/GamePlay.Route.ts.js";
  import endingRouter from "./modules/endinggallery/routers/endinggallery.js";
  import leaderboardRouter from "./modules/leaderboard/routers/leaderboard.js";

  const app = express();
  const PORT = process.env.PORT;
  if (!PORT) throw new Error('PORT is missing in your env file');

  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
  app.use("/api/achievements", achievementRouter);
  app.use("/api/gameplay", gameplayRouter);
  app.use("/api/endings", endingRouter);
  app.use("/api/leaderboard", leaderboardRouter);

  app.get("/", (_req, res: Response) => {
    res.send("Hello World");
  });

  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:%d", PORT);
  });