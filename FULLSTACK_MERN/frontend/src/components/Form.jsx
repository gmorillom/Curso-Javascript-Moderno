import { useEffect, useState } from "react"
import Alert from '../components/alert'
import usePatient from "../hooks/usePatient"

function Form() {
  const [name, setName] = useState('')
  const [owner, setOwner] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [issues, setIssues] = useState('')
  const [alertInfo, setAlertInfo] = useState({})
  const { savePatient, patient } = usePatient()
  const [id, setId] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if([name, owner, phonenumber, email, date, issues].includes('')){
      setAlertInfo({
        msg: "Todos los campos son obligatorios",
        error: true
      })

      setTimeout(() => {
        setAlertInfo({})
      }, 5000)

      return
    }

    setName(name.trim())
    setOwner(owner.trim())
    setPhonenumber(phonenumber.trim())
    setEmail(email.trim())
    setIssues(issues.trim())

    savePatient({ name, owner, phonenumber, email, date, issues, id })

    setName('')
    setOwner('')
    setPhonenumber('')
    setEmail('')
    setIssues('')
    setDate('')
  }

  useEffect(() => {
    
    if(patient?._id){
      setName(patient.name)
      setOwner(patient.owner)
      setPhonenumber(patient.phonenumber)
      setEmail(patient.email)
      setIssues(patient.issues)
      setDate(patient.date.toString().split('T')[0])
      setId(patient._id)
    }

  }, [patient])


  return (
    <div className="m-auto bg-white shadow-lg p-4 md:p-12">
      <h4 className="text-2xl font-bold text-center">Atiende a tus pacientes y <span className="text-indigo-600">registralos</span></h4>
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <label 
            htmlFor="name" 
            className="text-gray-700 uppercase font-bold"
            >Nombre del paciente</label>
          <input 
            type="text"
            id="name"
            name="name"
            className="w-full bg-gray-100 placeholder-gray-600 p-3 mt-2 focus:outline-none border-b-black rounded-lg"
            placeholder="Nombre del paciente..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="my-4">
          <label 
            htmlFor="owner" 
            className="text-gray-700 uppercase font-bold"
            >Dueño</label>
          <input 
            type="text"
            id="owner"
            name="owner"
            className="w-full bg-gray-100 placeholder-gray-600 p-3 mt-2 focus:outline-none border-b-black rounded-lg"
            placeholder="Nombre del dueño..."
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>

        <div className="my-4">
          <label 
            htmlFor="phonenumber" 
            className="text-gray-700 uppercase font-bold"
            >Teléfono</label>
          <input 
            type="text"
            id="phonenumer"
            name="phonenumer"
            className="w-full bg-gray-100 placeholder-gray-600 p-3 mt-2 focus:outline-none border-b-black rounded-lg"
            placeholder="+584127509062"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
          />
        </div>

        <div className="my-4">
          <label 
            htmlFor="email" 
            className="text-gray-700 uppercase font-bold"
            >email</label>
          <input 
            type="email"
            id="email"
            name="email"
            className="w-full bg-gray-100 placeholder-gray-600 p-3 mt-2 focus:outline-none border-b-black rounded-lg"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="my-4">
          <label 
            htmlFor="date" 
            className="text-gray-700 uppercase font-bold"
            >Fecha de Alta</label>
          <input 
            type="date"
            id="date"
            name="date"
            className="w-full bg-gray-100 placeholder-gray-600 p-3 mt-2 focus:outline-none border-b-black rounded-lg"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="my-4">
          <label 
            htmlFor="issues" 
            className="text-gray-700 uppercase font-bold"
            >Sintomas</label>
          <textarea 
            id="issues"
            name="issues"
            className="w-full bg-gray-100 placeholder-gray-600 p-3 mt-2 focus:outline-none border-b-black rounded-lg"
            placeholder="Describe la observación y diagnóstico veterinario"
            value={issues}
            onChange={(e) => setIssues(e.target.value)}
          ></textarea>
        </div>

        <div className="my-4">
          {Object.keys(alertInfo).length > 0 && (<Alert props={alertInfo} />)}
        </div>

        <div className="my-4">
          <input 
          type="submit"
          value={id ? "Actualizar paciente" : "Registar paciente"}
          className="btn w-full uppercase bg-indigo-700 p-4 font-bold text-white hover:cursor-pointer hover:bg-indigo-800 rounded-lg"
          />
        </div>
      </form>
    </div>
  )
}

export default Form