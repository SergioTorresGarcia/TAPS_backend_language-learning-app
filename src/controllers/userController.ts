import { Request, Response } from "express";
import { FindOperator, Like } from "typeorm";

import { User } from "../database/models/User";


//for admin:
export const getUsers = async (req: Request, res: Response) => {
    try {
        interface queryFilters {
            email?: FindOperator<string>,
            username?: FindOperator<string>
        }
        const queryFilters: queryFilters = {}

        // it searches dinamically (i.e. "email contains XXX")
        if (req.query.email) {
            queryFilters.email = Like("%" + req.query.email.toString().trim() + "%");
        }
        if (req.query.username) {
            queryFilters.username = Like("%" + req.query.username.toString().trim() + "%");
        }


        const users = await User.find({
            where: queryFilters,
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
                updatedAt: true
            },
            relations: {
                role: true
            }
        });

        res.status(200).json({
            success: true,
            message: "User(s) retrieved successfuly",
            data: users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User(s) cannot be retrieved",
            error: error
        })
    }

}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);

        const users = await User.findOne({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
                updatedAt: true
            },
            relations: {
                role: true
            }
        });

        res.status(200).json({
            success: true,
            message: "User retrieved successfuly",
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cannot be retrieved",
            error: error
        })
    }
}

export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await User.findOne({
            where: { id: userId }
        })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        await User.remove(user)
        res.status(200).json({
            success: true,
            message: "User deleted successfuly"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cannot be deleted",
            error: error
        })
    }
}


// for user:
export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId

        console.log(userId);

        const user = await User.findOne({
            where: { id: userId }
        })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Profile retrieved successfuly",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Profile cannot be retrieved",
            error: error
        })
    }
}

export const updateSelfProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;
        const username = req.body.username;

        const userProfile = await User.findOne({
            where: {
                id: userId
            }
        });

        if (!userProfile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }
        userProfile.username = username as string;
        const updatedProfile = await userProfile.save();

        res.status(200).json({
            success: true,
            message: "Your profile has been updated successfuly",
            data: updatedProfile
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Your profile cannot be updated",
            error: error
        })
    }
}
