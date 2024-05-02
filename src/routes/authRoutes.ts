
import { Router } from "express";

export const authRouter = Router();

import { login, register } from "../controllers/authController";

// Authorisation:
authRouter.post("/auth/register", register)
authRouter.post("/auth/login", login)