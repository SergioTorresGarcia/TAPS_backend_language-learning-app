
import { Router } from "express";

export const roleRouter = Router();

import { getRoles, createRole, updateRole, deleteRole } from "../controllers/roleController";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

// Roles:
roleRouter.get("/roles", auth, isAdmin, getRoles)
roleRouter.post("/roles", auth, isAdmin, createRole)
roleRouter.put("/roles/:id", auth, isAdmin, updateRole)
roleRouter.delete("/roles/:id", auth, isAdmin, deleteRole)