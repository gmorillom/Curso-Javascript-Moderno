import usePatient from '../hooks/usePatient'
import { useEffect } from "react"
import Patient from "../components/Patient"

function PatientList() {
  const { patients } = usePatient()

  return (
    <>
      <div className="p-2 md:p-6">
        {
          patients.length == 0
          ? (
            <h3 className="text-center font-bold text-3xl uppercase">
              No hay pacientes
            </h3>
          )
          : (
            <div>
              <h3 className="text-center font-bold text-3xl uppercase mb-5">
                Pacientes
              </h3>
              <div className="w-full">
                {
                 patients.map(patient => (
                  <Patient 
                    key={patient._id} 
                    data={patient} 
                    />
                 ))
                }
              </div>

            </div>
          )
        }
      </div>
    </>
  )
}

export default PatientList