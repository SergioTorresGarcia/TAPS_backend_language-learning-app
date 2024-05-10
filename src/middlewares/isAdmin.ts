import { NextFunction, Request, Response } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.tokenData.roleName !== "admin") {

            return res.status(401).json({
                success: false,
                message: "No admin priviledges",
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "You don't have permissions"
        })
    }
}