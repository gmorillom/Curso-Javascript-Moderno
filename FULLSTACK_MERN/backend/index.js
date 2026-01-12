import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import connectDB from "./config/db.js"
import veterinarioRoutes from "./routes/veterinario.js"
import pacienteRoutes from "./routes/paciente.js"

dotenv.config({quiet:true})

const port = process.env.PORT || 4000
const host = process.env.HOST || "127.0.0.1"
const app = express()

app.use(express.json()) // Habilitamos el acceso a la información recibida en formato JSOn
connectDB()

const allowedServers = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function(origin, callback){
        if(allowedServers.indexOf(origin) !== -1){
            callback(null, true)
        }
    }
}

app.use(cors(corsOptions))
app.use("/api/veterinarios", veterinarioRoutes)
app.use("/api/pacientes", pacienteRoutes)

app.listen(port, host, () => {
    console.log(`Servidor ExpressJs ejecutándose en el puerto ${host}:${port}`)
})