import PatientList from "../components/PatientList"
import PatientForm from "../components/Form"
import { useState } from "react"

function adminPatient() {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <div>
        <button
        className="btn rounded-lg bg-indigo-600 py-2 px-8 text-white uppercase font-bold mx-14 mb-10 md:hidden"
        onClick={() => setShowForm(!showForm)}
        >
          Mostrar formulario
        </button>
      </div>
      <div className="flex flex-col md:flex-row bg-gray-50 p-2 md:p-12">
        <div className={`${showForm ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
          <PatientForm />
        </div>
        <div className="md:w-1/2 lg:w-3/5">
          <PatientList />
        </div>
      </div>
    </>
  )
}

export default adminPatient