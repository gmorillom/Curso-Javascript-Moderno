import { createContext, useEffect, useState } from "react"
import axiosCLI from "../config/axiosClient"


const PatientContext = createContext()


export const PatientProvider = ({children}) => {
    const [patients, setPatients] = useState([])
    const [patient, setPatient] = useState(null)
    
    const getPatients = async () => {
        try{
            const token = localStorage.getItem('token')
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axiosCLI('/pacientes',config)
            const pats = data.data.map(p => {
                const { createdAt, updatedAt, __v, ...newPatient } = p

                return newPatient
            })


            setPatients(prevData => [...prevData, ...pats])

        } catch(error){
            console.error(error.response.data.message)
        }
    }

    const updatePatient = (p) => {
        setPatient(p)
    }

    useEffect(() => {
        getPatients()

    }, [])

    const savePatient = async (patient) => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        if(patient.id){
            try {
                const { data } = await axiosCLI.put(`/pacientes/${patient.id}`, patient, config )
                const { createdAt, updatedAt, __v, ...updatedPatient } = data.data
                const updatedPatients = patients.map(p => p._id == updatedPatient._id ? updatedPatient : p)
                setPatients(updatedPatients)
                
            } catch (error) {
                console.error(error.response.data.message)
            }
        }
        else {
            try {
                const { data } = await axiosCLI.post('/pacientes', patient, config )
                const { createdAt, updatedAt, __v, ...newPatient } = data.data
                setPatients(prevData => [...prevData, newPatient])
                
            } catch (error) {
                console.error(error.response.data.message)
            }
        }
    }

    const removePatient = async (id) => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        try {
            const { data } = await axiosCLI.delete(`/pacientes/${id}`, config )
            const updatedPatients = patients.filter(p => p._id != id )
            setPatients(updatedPatients)
                
        } catch (error) {
            console.error(error.response.data.message)
        }
    }

    return (
        <PatientContext.Provider
            value={{
                patients,
                savePatient,
                updatePatient,
                removePatient,
                patient
            }}
        >
            {children}
        </PatientContext.Provider>

    )
}


export default PatientContext