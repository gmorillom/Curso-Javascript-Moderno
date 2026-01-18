import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Alert from '../components/alert'
import axiosCLI from '../config/axiosClient'

function ConfirmPassword() {
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [alertInfo, setAlertInfo] = useState({})
  const params = useParams()
  const [validToken, setValidToken] = useState(false)
  const [passwordModified, setPasswordModified] = useState(false)

  useEffect(() => {
    const verifyUserToken = async () => {
       try {
      
        const data = await axiosCLI(`/veterinarios/forgot-password/${params.token}`)
        setAlertInfo({msg: 'Ingrese su nueva contraseña', error: false})
        setValidToken(true)
        
      } catch (error) {
        setAlertInfo({msg: 'Hubo un error con el enlace', error: true})
      }
    }

    verifyUserToken()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(password.length < 6){
      setAlertInfo({msg:'La contraseña es muy corta', error: true})
      setTimeout(() => {setAlertInfo({})},5000)
        
      return
    }
      
    if(password != repeatPassword){
      setAlertInfo({msg:'La contraseña no coincide con la ingresada', error: true})
      setTimeout(() => {setAlertInfo({})},5000)
        
      return
    }

    try {
      const data = await axiosCLI.post(`/veterinarios/forgot-password/${params.token}`, {password})
      setAlertInfo({msg: data.data.message, error: false})
      setPasswordModified(true)
    } catch (error) {
      setAlertInfo({msg: error.response.data.message, error: true})
    }
  }

  return (
      <>
        <div className="mb-20 md:mb-5">
            <h1 className="block text-6xl font-black text-indigo-700">
                Establece una contraseña y administra tus <span className="text-black">pacientes</span>
            </h1>
        </div>
        <div className="shadow-lg rounded-xl bg-white py-10 px-5">
            {Object.keys(alertInfo).length > 0 && (<Alert props={alertInfo} />)}
            
            {validToken && (<>
              <form onSubmit={handleSubmit}>
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
                  value="Restablecer clave"
                  name="sendBtn"
                  id="sendBtn"
                  className="py-4 px-20 md:w-auto w-full  bg-indigo-800 text-white text-lg font-bold mt-3 hover:cursor-pointer hover:bg-indigo-950 uppercase rounded-xl"
                  />
              </form>
            
              <nav className="mt-8 md:flex md:justify-between">
                  <Link to="/register" className="block text-gray-500">¿No tienes una cuenta? Regístrate</Link>
                  {passwordModified && (<Link to="/" className="block text-gray-500">¿Ya recuperaste tu acceso? Inicia sesión</Link>)}
              </nav>
            </>)}
        </div>
      </>
  )
}

export default ConfirmPassword