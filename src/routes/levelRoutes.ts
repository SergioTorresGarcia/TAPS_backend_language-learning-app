
import { Router } from "express";

export const levelRouter = Router();

import { createNewLevel, getLevels } from "../controllers/levelController";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

// Levels:
levelRouter.get("/levels", auth, getLevels)
levelRouter.post("/levels/new", auth, isAdmin, createNewLevel)