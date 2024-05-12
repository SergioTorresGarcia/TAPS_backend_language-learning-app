import { Request, Response } from "express"
import { Level } from "../database/models/Level";


export const getLevels = async (req: Request, res: Response) => {
    const levels = await Level.find();
    console.log(levels);

    res.status(200).json({
        success: true,
        message: "Levels retrieved successfuly",
        data: levels
    })
}

export const createNewLevel = async (req: Request, res: Response) => {
    try {
        const name = req.body.name;

        const newLevel = await Level.create({
            name: name.trim()
        }).save()

        res.status(201).json({
            success: true,
            message: "New level created successfuly",
            data: newLevel
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "New level cannot be created",
            error: error
        })
    }
}