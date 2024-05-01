
import { Router } from "express";

export const userRouter = Router();

import {
    getUsers
} from "../controllers/userController";

// Endpoints for the admin:
userRouter.get("/api/auth/users", getUsers)

