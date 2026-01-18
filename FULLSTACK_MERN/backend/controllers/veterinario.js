import generarId from '../helpers/generarId.js'
import generarJWT from '../helpers/generarJWT.js'
import Veterinario from '../models/veterinario.js'
import ConfirmAccountMailer from '../helpers/ConfirmAccountMailer.js'
import ForgotPasswordMailer from '../helpers/ForgotPasswordMailer.js'

const signup = async (req, res) => {

    try {
        const { email } = req.body
        const veterinarioModel = new Veterinario(req.body)
        
        if(await Veterinario.findOne({email})){
            const error = new Error('Ya existe este veterinario')
            
            return res.status(400).json({message:error.message})
        }
        
        const veterinarioSaved = await veterinarioModel.save()

        ConfirmAccountMailer({email, name: req.body.name, token: veterinarioSaved.token})

        res.status(200).json({
            message: "Endpoint de registro",
            data: veterinarioSaved
        })
    
    } catch(error) {
        console.error(`Error al guardar un veterinario ${error.message}`)
        
        return res.status(400).json({message: "Error al guardar un veterinario. Verifique los datos e intente nuevamente"}) 
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body
        
        if(!email || !password){
            const error = new Error('Correo electrónico y contraseña son obligatorios')

            return res.status(400).json({message: error.message})
        }

        const veterinario = await Veterinario.findOne({email})

        if(!veterinario){
            const error = new Error('El veterinario no existe')

            return res.status(404).json({message:error.message})
        }

        const isValidPassword = await veterinario.comparePassword(password)
        
        if(!isValidPassword){
            const error = new Error('No existe un veterinario asociado a esta contraseña')

            return res.status(404).json({message: error.message})
        }

        // generamos JSON Web Token
        const jwtToken = generarJWT(veterinario.id)

        return res.status(200).json({
            message: 'Usuario autenticado exitosamente!',
            user: {
                name: veterinario.name,
                email: veterinario.email,
                token: jwtToken,
                _id: veterinario._id
            }
        })
        
    } catch(error){
        console.error(`Hubo un error al autenticar usuario ${error.message}`)

        return res.status(400).json({message: 'Error al autenticar el usuario'})
    }
}


const confirm = async (req, res) => {
    try{
        const { token } = req.params
        const veterinario = await Veterinario.findOne({token})

        if(!veterinario){
            const error = new Error('Token invalido')

            return res.status(401).json({message: error.message})
        }

        veterinario.token = null
        veterinario.confirmed = true
        
        const veterinarioSaved = await veterinario.save()
        
        if(veterinarioSaved.confirmed){
            res.status(200).json({
                message: "Veterinario confirmado exitosamente",
                data: {
                    name: veterinario.name
                }
            })
        } else throw new Error('La confirmación del token no pudo ser registrada')

    } catch(error){
        console.error(`Hubo un error al verificar el token de confirmación ${error.message}`)

        return res.status(400).json({message: 'Hubo un error al verificar el token de confirmación'})
    }
}

const profile = (req, res) => {
    res.json(req.user)
}

const forgotPassword = async (req, res) => {
    const { email } = req.body

    try{
        const veterinario = await Veterinario.findOne({email})

        if(!veterinario){
            const error = new Error('No existe el veterinario')
            return res.status(404).json({message: error.message})
        }

        // asignamos al usuario un token temporal y lo compartimos
        veterinario.token = generarId()
        await veterinario.save()
        ForgotPasswordMailer({email, token: veterinario.token, name: veterinario.name})

        return res.status(200).json({
            message: 'Veterinario encontrado',
            token: veterinario.token
        })

    } catch(error){
        console.error(`Hubo un error intentando recuperar la contraseña ${error.message}`)
        
        return res.status(4000).json({message: `No se pudo recuperar la contraseña, intente nuevamente.`})
    }
}

const verifyNewPasswordToken = async (req, res) => {
    const { token } = req.params

    if(!token){
        const error = new Error('No está autorizado')
        
        return res.status(403).json({message: error.message})
    }

    const veterinario = await Veterinario.findOne({token}).select("-password -confirmed")

    if(!veterinario){
        const error = new Error('Token inválido')

        return res.status(404).json({message: error.message})
    }

    return res.status(200).json({
        message: 'Token válido',
        data: veterinario
    })
}

const newPassword = async (req, res) => {
    const { password } = req.body
    const { token } = req.params
    
    try{
        if(token && password){
            const veterinario = await Veterinario.findOne({token})

            if(!veterinario){
                const error = new Error('Token inválido')

                return res.status(403).json({message: error.message})
            }

            veterinario.password = password
            veterinario.token = null
            await veterinario.save()

            return res.status(200).json({message: 'Contraseña actualizada exitosamente'})
        }

    } catch(error){
        console.error(`Error al actualizar la contraseña ${error.message}`)

        return res.status(400).json({message: 'No se pudo actualizar la contraseña'})
    }
    
    
}

export { signup, login, confirm, profile, forgotPassword, verifyNewPasswordToken, newPassword }