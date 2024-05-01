
import { Router } from "express";

export const roleRouter = Router();

import { getRoles, createRole, updateRole, deleteRole } from "../controllers/roleController";

// Roles:
roleRouter.get("/api/auth/roles", getRoles)
roleRouter.post("/api/auth/roles", createRole)
roleRouter.put("/api/auth/roles/:id", updateRole)
roleRouter.delete("/api/auth/roles/:id", deleteRole)