import "dotenv/config";

import { app } from "./app";
import { AppDataSource } from "./database/db";

const PORT = process.env.PORT || 4500

const startServer = () => {
    AppDataSource.initialize()
        .then(() => {
            console.log("database connected")
            app.listen(PORT, () => {
                console.log(`Server is running on port: ${PORT}`);
            })
        })
        .catch((error: any) => {
            console.log("error")
        })
    // app.listen(4500, () => console.log("Servidor levantado en 4500"))
}

startServer();
// npm run dev <- command that runs the server