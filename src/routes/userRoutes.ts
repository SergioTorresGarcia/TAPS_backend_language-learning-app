
import { Router } from "express";

export const userRouter = Router();

import {
    getUserById,
    getUsers
} from "../controllers/userController";

// Endpoints for the admin:
userRouter.get("/api/auth/users", getUsers)
userRouter.get("/api/auth/users/:id", getUserById)
