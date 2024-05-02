
import { Router } from "express";

export const roleRouter = Router();

import { getRoles, createRole, updateRole, deleteRole } from "../controllers/roleController";

// Roles:
roleRouter.get("/auth/roles", getRoles)
roleRouter.post("/auth/roles", createRole)
roleRouter.put("/auth/roles/:id", updateRole)
roleRouter.delete("/auth/roles/:id", deleteRole)