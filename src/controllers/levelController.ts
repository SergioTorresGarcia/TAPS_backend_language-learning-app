import { Request, Response } from "express"
import { Level } from "../database/models/Level";


export const getLevels = async (req: Request, res: Response) => {
    const levels = await Level.find();
    res.status(200).json({
        success: true,
        message: "Levels retrieved successfuly",
        data: levels
    })
}