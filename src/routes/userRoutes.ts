
import { Router } from "express";

export const userRouter = Router();

import {
    deleteUserById,
    getUserById,
    getUsers
} from "../controllers/userController";

// Endpoints for the admin:
userRouter.get("/auth/users", getUsers)
userRouter.get("/auth/users/:id", getUserById)

userRouter.delete("/api/auth/users/:id", deleteUserById)