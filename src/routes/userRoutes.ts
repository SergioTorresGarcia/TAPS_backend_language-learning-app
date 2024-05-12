
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
import { isAdmin } from "../middlewares/isAdmin";


// Endpoints fot the users:
userRouter.get("/users/me", auth, getProfile)
userRouter.put("/users/me", auth, updateSelfProfile)
userRouter.delete("/users/me", auth, deleteSelfProfile)


// Endpoints for the admin:
userRouter.get("/users", auth, isAdmin, getUsers)
userRouter.get("/users/:id", auth, isAdmin, getUserById)
userRouter.delete("/users/:id", auth, isAdmin, deleteUserById)