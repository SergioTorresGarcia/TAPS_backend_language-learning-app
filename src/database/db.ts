import "reflect-metadata"
import "dotenv/config"
import { DataSource } from "typeorm"

// migrations
import { Roles1714390675301 } from "./migrations/1714390675301-roles"
import { Users1714392154222 } from "./migrations/1714392154222-users"
import { Levels1714392894758 } from "./migrations/1714392894758-levels"
import { Challenges1714393084285 } from "./migrations/1714393084285-challenges"
import { Words1714393188539 } from "./migrations/1714393188539-words"
import { UserWords1714393457056 } from "./migrations/1714393457056-user_words"

// models
// import { Role } from "../models/Role"
// import { User } from "../models/User"



export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "final_project_taps",
    entities: [], //Role, User, Level, Challenge, Word, UserWord],
    migrations: [
        Roles1714390675301,
        Users1714392154222,
        Levels1714392894758,
        Challenges1714393084285,
        Words1714393188539,
        UserWords1714393457056
    ],
    synchronize: false,
    logging: false,
})