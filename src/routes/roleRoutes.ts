
import { Router } from "express";

export const roleRouter = Router();

import { getRoles, createRole, updateRole, deleteRole } from "../controllers/roleController";
import { auth } from "../middlewares/auth";

// Roles:
roleRouter.get("/roles", auth, getRoles)
roleRouter.post("/roles", auth, createRole)
roleRouter.put("/roles/:id", auth, updateRole)
roleRouter.delete("/roles/:id", auth, deleteRole)