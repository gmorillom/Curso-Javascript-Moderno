import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Alert from "../components/alert"
import axiosCLI from "../config/axiosClient"

function ConfirmAccount() {
  const params = useParams()
  const { id } = params
  const [confirmed, setConfirmed] = useState(false)
  const [alertInfo, setAlertInfo] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('Cargando useEffect')
    const confirmAccount = async () => {
      try {
        // const confirmRequest = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/confirm/${id}`)
        const confirmRequest = await axiosCLI(`veterinarios/confirm/${id}`)
        setConfirmed(true)
        setAlertInfo({
          msg: `${confirmRequest.data.data.name} su cuenta ha sido verificada exitosamente`,
          error: false
        })
      } catch (error) {
        setAlertInfo({
          msg: error.response.data.message,
          error: true
        })
      }

      setLoading(false)
    }

    confirmAccount()

  }, [])

  return (
    <>
      <div className="mb-10">
        <h1 className="block text-6xl font-black text-indigo-700">
          Confirma tu cuenta y empieza a administrar <span className="text-black">pacientes</span>
        </h1>
      </div>
      <div className="shadow-lg rounded-xl bg-white py-10 px-5">
        {
          !loading && (<Alert props={alertInfo} />)
        }
            
        <nav className="mt-8 md:flex md:justify-center">
          {
            confirmed && (<Link to="/" className="block text-gray-500">Inicia sesión</Link>)
          }
        </nav>
      </div>
    </>
  )
}

export default ConfirmAccount