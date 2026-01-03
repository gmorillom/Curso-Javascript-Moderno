import mongoose from "mongoose"
import generarId from "../helpers/generarId.js"
import bcrypt from "bcrypt"

const modelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phonenumber: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null,
        trim: true
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
        default: generarId(),
        trim: true
    }
})

// Agregamos un hook que se ejecutará antes de insertar o actualizar un registro
// Aquí no podemos utilizar un arrow function como callback porque necesitamos acceder a la instancia del modelo veterinario que 
// estamos creando o actualizando
modelSchema.pre('save', async function (){
    // Queremos aplicar un hashing a la contraseña... Necesitamos verificar que se aplique el hashing solo a contraseñas nuevas
    // Otra opción es verificar si no cambió la contraseña entonces que pase al siguiente middleware con next() pero esto no permite utilizar el middleware para otros casos
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(11) // a mayor salt mayor consumo de recursos
        this.password = await bcrypt.hash(this.password, salt)
    }
})

// Al esquema de un modelo le puedo agregar metodos
// La definición de los métodos no puede utilizar la sintaxis de arrow functions asi podemos acceder a la instancia actual
modelSchema.methods.comparePassword = async function(passwordString) {
    return await bcrypt.compare(passwordString, this.password)
}

const Veterinario = mongoose.model('Veterinario', modelSchema)

export default Veterinario