import { Request, Response } from "express"
import { Role } from "../database/models/Role";


export const getRoles = async (req: Request, res: Response) => {
    const roles = await Role.find();
    res.status(200).json({
        success: true,
        message: "Roles retrieved successfuly",
        data: roles
    })
}


export const createRole = async (req: Request, res: Response) => {
    try {
        const name = (req.body.name).trim();

        if (name.length >= 50 || name.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Role name must be between 1 and 40 characters"
            })
        }

        const newRole = await Role.create({
            name: name
        }).save()

        res.status(201).json({
            success: true,
            message: "Role created successfuly",
            data: newRole
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Role cannot be created",
            error: error
        })
    }
}

export const updateRole = async (req: Request, res: Response) => {
    const { name } = req.body;
    const userId = parseInt(req.params.id);

    try {
        if (name.length >= 40 || name.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Role name must be between 1 and 40 characters"
            })
        }

        const role = await Role.findOne({ where: { id: userId } });
        if (!role) {
            return res.status(404).json({
                success: false,
                message: 'Role not found'
            });
        }
        role.name = name;
        const updatedRole = await role.save();

        res.status(200).json({
            success: true,
            message: 'Role updated successfully',
            data: updatedRole
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Role was not updated",
            error: error
        })
    }
}

export const deleteRole = (req: Request, res: Response) => {
    try {
        const roleId = parseInt(req.params.id);

        if (!roleId) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        Role.delete(
            { id: roleId }
        )

        res.status(200).json({
            "success": true,
            "message": "Role deleted successfuly"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Role was not updated",
            error: error
        })
    }
}