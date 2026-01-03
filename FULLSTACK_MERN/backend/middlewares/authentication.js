import jwt from "jsonwebtoken"
import Veterinario from "../models/veterinario.js"

export default async (req, res, next) => {
    const { authorization } = req.headers
    let token = null

    try {
        if(authorization && authorization.startsWith('Bearer')){
            token = authorization.split(' ')[1]
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await Veterinario.findById(decoded.id).select("-password -token -confirmed") //no necesitamos contraseña, token temporal y bandera de confirmado
            
            return next() // esto es importante para que express continue su ejecución al siguiente middleware
        }
    } catch(error){
        console.error(`No se pudo decodificar el JSON Web Token enviado ${error.message}`)

        return res.status(403).json({message: 'No está autorizado'})
    }

    if(!token){
        const error = new Error('El token es inválido o no existe')
        return res.status(403).json({message: error.message})
    }

}