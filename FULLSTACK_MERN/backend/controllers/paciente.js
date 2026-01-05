import Paciente from "../models/paciente.js"
import Veterinario from "../models/veterinario.js"

const registerPatient = async (req, res) => {
    try {
        const paciente = new Paciente(req.body)
        paciente.veterinario = req.user._id
        const pacienteSaved = await paciente.save()

        return res.status(200).json({
            message: 'Paciente registrado exitosamente',
            data: pacienteSaved
        })

    } catch(error) {
        console.error(`Hubo un error al registrar un paciente ${error.message}`)

        return res.status(400).json({message: 'No se pudo registrar el paciente'})
    }
}

const getPatients = async (req, res) => {
    const patients = await Paciente.find().where('veterinario').equals(req.user)

    return res.status(200).json({
        message: "Lista de pacientes",
        data: patients
    })
}

const getPatient = async (req, res) => {
    const patient = await Paciente.findById(req.params.id)

    if(!patient){
        return res.status(404).json({
            message: "No existe el paciente",
            data: patient
        })
    }
    
    if(patient && patient.veterinario._id.toString() != req.user._id.toString()){
        return res.status(403).json({message: "No tiene permisos para ver este paciente"})
    }
    

    return res.status(200).json({
        message: "Respuesta de la búsqueda",
        data: patient
    })
}

const updatePatient = async (req, res) => {
    try {
        const patient = await Paciente.findById(req.params.id)
    
        if(!patient){
            return res.status(404).json({
                message: "No existe el paciente",
                data: patient
            })
        }

        if(patient && patient.veterinario._id.toString() != req.user._id.toString()){
            return res.status(403).json({message: "No tiene permisos para actualizar este paciente"})
        }

        Object.assign(patient, req.body) // si bien se pueden concatenar campos indeseados en esta parte
        await patient.save() // mongoose guarda sólo los cambios referentes a campos que él conoce del modelo definido
        

        return res.status(200).json({
            message: "Paciente actualizado",
            data: patient
        })

    } catch(error){
        console.error(`Hubo un problema al actualizar el paciente ${error.message}`)

        return res.status(400).json({message: "No se pudo actualizar el paciente"})
    }
}

const deletePatient = async (req, res) => {
    try{
        const patient = await Paciente.findById(req.params.id)

        if(!patient){
            return res.status(404).json({
                message: "No existe el paciente",
                data: patient
            })
        }

        if(patient && patient.veterinario._id.toString() != req.user._id.toString()){
            return res.status(403).json({message: "No tiene permisos para eliminar este paciente"})
        }

        await patient.deleteOne()

        return res.status(200).json({
            message: "Paciente eliminado exitosamente",
        })

    } catch(error){
        console.error(`Hubo un problema al eliminar el paciente ${error.message}`)

        return res.status(400).json({message: "No se pudo eliminar el paciente"})
    }
}

export { registerPatient, getPatients, getPatient, updatePatient, deletePatient }