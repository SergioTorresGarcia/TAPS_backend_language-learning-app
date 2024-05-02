
import { Router } from "express";

export const userRouter = Router();

import {
    deleteSelfProfile,
    updateSelfProfile,
    getProfile,
    deleteUserById,
    getUserById,
    getUsers
} from "../controllers/userController";

import { auth } from "../middlewares/auth";


// Endpoints fot the users:
userRouter.get("/users/me", auth, getProfile)
userRouter.put("/users/me", auth, updateSelfProfile)
userRouter.delete("/users/me", auth, deleteSelfProfile)


// Endpoints for the admin:
userRouter.get("/users", auth, getUsers)
userRouter.get("/users/:id", auth, getUserById)
userRouter.delete("/users/:id", auth, deleteUserById)