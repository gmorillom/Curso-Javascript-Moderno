import express from "express"
import dotenv from "dotenv"

import connectDB from "./config/db.js"
import veterinarioRoutes from "./routes/veterinario.js"

dotenv.config({quiet:true})

const port = process.env.PORT || 4000
const host = process.env.HOST || "127.0.0.1"
const app = express()
app.use(express.json()) // Habilitamos el acceso a la información recibida en formato JSOn
connectDB()

app.use("/api/veterinarios", veterinarioRoutes)

app.listen(port, host, () => {
    console.log(`Servidor ExpressJs ejecutándose en el puerto ${host}:${port}`)
})