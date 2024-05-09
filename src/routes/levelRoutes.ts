
import { Router } from "express";

export const levelRouter = Router();

import { getLevels } from "../controllers/levelController";
import { auth } from "../middlewares/auth";

// Levels:
levelRouter.get("/levels", auth, getLevels)