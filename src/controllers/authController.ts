import { Request, Response } from "express"
import { User } from "../database/models/User";
import bcrypt, { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

import { isValidPassword } from "../helpers/passwordValidation";
import { isValidEmail } from "../helpers/emailValidation";


export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const passValid = isValidPassword(password);
        const emailValid = isValidEmail(email)

        if (!passValid || !emailValid) {
            return res.status(400).json({
                success: false,
                message: "Email and password are needed"
            })
        }

        const password_hash = hashSync(password, 8);

        const newUser = await User.create({
            username: username,
            email: email,
            passwordHash: password_hash,
            role: { id: 2 }
        }).save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User couldn't be registered",
            data: error
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log("body", email, password);

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are needed"
            })
        }

        const user = await User.findOne({
            where: { email: email },
            relations: { role: true },
            select: {
                id: true,
                username: true,
                email: email,
                passwordHash: true,
                role: {
                    name: true
                }
            }
        })
        console.log("user", user);

        if (!user) {
            res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        const passwordIsValidPasswor = bcrypt.compareSync(password, user!.passwordHash);

        if (!passwordIsValidPasswor) {
            return res.status(400).json({
                success: false,
                message: "Email and/or password invalid"
            })
        }

        //if all is correct, then we generate a token for this session
        const token = jwt.sign({
            userName: user?.username,
            userId: user?.id,
            roleName: user?.role.name
        },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "500h" // optional variable parameter
            }
        )

        res.status(201).json({
            success: true,
            message: "User logged in successfully",
            token: token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User can't be logged in",
            data: error
        })

    }
}