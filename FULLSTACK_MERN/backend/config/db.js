import mongoose from "mongoose"

const connectDB = async () => {

    try {
        const uri = process.env.MONGODB_URI
        const options = {
            autoIndex:true, // Mongoose construirá los indices definidos en el schema de la base de datos, en grandes proyectos esto puede afectar al rendimiento
            dbName: "apv", // Especificamos la base de datos deseada del cluster (útil en caso de utilizar mongodb Atlas)
            heartbeatFrequencyMS: 1000 // Emite señales para verificar la conexión con el servidor mongodb, mongoose solo emite un evento de desconexión cuando una señal falla 
        }
        const db = await mongoose.connect(uri,options)
        const successMessage = `Se ha establecido la conexión con MongoDB en ${db.connection.host}:${db.connection.port}`
        console.log(successMessage)

    } catch(error) {
        console.log(`No se pudo establecer la conexión a MongoDB ${error.message}`)
        process.exit(1) // Detenemos el programa
    }

}

export default connectDB