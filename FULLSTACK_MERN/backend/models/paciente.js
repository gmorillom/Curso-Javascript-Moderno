import mongoose from "mongoose"

const modelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        owner: {
            type: String,
            required: true,
            trim: true
        },
        phonenumber: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        issues: {
            type: String,
            required: true,
            trim: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        veterinario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Veterinario'
        }
    }, {
        timestamps: true
    }
)

const Paciente = mongoose.model('Paciente', modelSchema)

export default Paciente