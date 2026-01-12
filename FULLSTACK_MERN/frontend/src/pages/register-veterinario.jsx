import { Link } from "react-router-dom"
import { useState } from "react"
import Alert from "../components/alert"
import axios from "axios"
import axiosCLI from "../config/axiosClient"

function RegisterVeterinario() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertInfo, setAlertInfo] = useState({
    msg: "",
    error: false
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if([name, email, password, repeatPassword].includes('')){
      setAlertInfo({msg:'Todos los campos son requeridos', error: true})
      setShowAlert(true)

      setTimeout(() => {setShowAlert(false)},5000)
      
      return
    }

    if(password.length < 6){
      setAlertInfo({msg:'La contraseña es muy corta', error: true})
      setShowAlert(true)

      setTimeout(() => {setShowAlert(false)},5000)
      
      return
    }

    
    if(password != repeatPassword){
      setAlertInfo({msg:'La contraseña no coincide con la ingresada', error: true})
      setShowAlert(true)

      setTimeout(() => {setShowAlert(false)},5000)
      
      return
    }

    try {
      // const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/signup`,{name, password, email})
      const resp = await axiosCLI.post(`veterinarios/signup`,{name, password, email})

      setShowAlert(true)
      setAlertInfo({msg: resp.data.message, error: false})

      setTimeout(() => {setShowAlert(false)},5000)

    } catch(error){
      console.error(error.response)
      
      setShowAlert(true)
      setAlertInfo({msg: error.response.data.message, error: true})

      setTimeout(() => {setShowAlert(false)},5000)
    }

  }


  return (
    <>
      <div className="mb-10">
        <h1 className="block text-6xl font-black text-indigo-700">
          Inicia sesión para administrar tus <span className="text-black">pacientes</span>
        </h1>
      </div>
      <div className="shadow-lg rounded-xl bg-white py-10 px-5">
        {
          showAlert && (<Alert props={alertInfo} />)
        }
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="uppercase text-gray-600 text-xl font-bold">Nombre</label>
          <input 
            type="name" 
            placeholder="Nombre y apellido" 
            name="name" 
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-200 bg-gray-200 w-full rounded-xl p-3 mt-2 text-black focus:border-gray-100 focus:outline-none mb-5"/>

          <label htmlFor="email" className="uppercase text-gray-600 text-xl font-bold">Correo</label>
          <input 
            type="email" 
            placeholder="example@gmail.com" 
            name="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            className="border border-gray-200 bg-gray-200 w-full rounded-xl p-3 mt-2 text-black focus:border-gray-100 focus:outline-none mb-5"/>

          <label htmlFor="password" className="uppercase text-gray-600 text-xl font-bold">Contraseña</label>
          <input 
            type="password" 
            placeholder="Clave de acceso" 
            name="password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            className="border border-gray-200 bg-gray-200 w-full rounded-xl p-3 mt-2 text-black focus:border-green-100 focus:outline-none mb-5"/>

          <label htmlFor="repeat-password" className="uppercase text-gray-600 text-xl font-bold">Repetir contraseña</label>
          <input 
            type="password" 
            placeholder="Repite tu contraseña" 
            name="repeat-password" 
            id="repeat-password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value.trim())}
            className="border border-gray-200 bg-gray-200 w-full rounded-xl p-3 mt-2 text-black focus:border-green-100 focus:outline-none mb-5"/>

          <input 
            type="submit"
            value="Crear cuenta"
            name="sendBtn"
            id="sendBtn"
            
            className="py-4 px-20 md:w-auto w-full  bg-indigo-800 text-white text-lg font-bold mt-3 hover:cursor-pointer hover:bg-indigo-950 uppercase rounded-xl"
            />
        </form>
            
        <nav className="mt-8 md:flex md:justify-between">
          <Link to="/" className="block text-gray-500">¿Ya tienes una cuenta? Inicia sesión</Link>
          <Link to="/forgot-password" className="block text-gray-500">¿Olvidaste tu contraseña?</Link>
        </nav>
      </div>
    </>
  )
}

export default RegisterVeterinario