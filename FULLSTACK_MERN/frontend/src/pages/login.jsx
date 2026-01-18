import { Link, Navigate, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useState } from "react"
import axiosCLI from "../config/axiosClient"
import Alert from '../components/alert'

function login() {
    const { setAuth, auth } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alertInfo, setAlertInfo] = useState({})
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if([email, password].includes('')){
            setAlertInfo({
                msg: 'Todos los campos son obligatorios',
                error: true
            })

            setTimeout(() => {
                setAlertInfo({})
            }, 5000)

            return
        }

        try {
            const { data } = await axiosCLI.post('/veterinarios/login', {email, password})

            setAlertInfo({
                msg: data.message,
                error: false
            })

            localStorage.setItem('token',data.user.token)
            setAuth(data.user)
            navigate('/admin')

        } catch (error) {
            setAlertInfo({
                msg: error.response.data.message,
                error: true
            })

            setTimeout(() => {
                setAlertInfo({})
            }, 5000)
        }

    }

    if(auth?._id) return (<Navigate to="/admin"/>)


    return (
        <>
            <div className="mb-20 md:mb-5">
                <h1 className="block text-6xl font-black text-indigo-700">
                    Inicia sesión para administrar tus <span className="text-black">pacientes</span>
                </h1>
            </div>
            <div className="shadow-lg rounded-xl bg-white py-10 px-5">
                {Object.keys(alertInfo).length > 0 && (<Alert props={alertInfo} />)}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className="uppercase text-gray-600 text-xl font-bold">Correo</label>
                    <input 
                        type="email" 
                        placeholder="example@gmail.com" 
                        name="email" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trim())}
                        className="border border-gray-200 bg-gray-200 w-full rounded-xl p-3 mt-2 text-black focus:border-gray-100 focus:outline-none mb-5" autoComplete="true"/>

                    <label htmlFor="password" className="uppercase text-gray-600 text-xl font-bold">Contraseña</label>
                    <input 
                        type="password" 
                        placeholder="Clave de acceso" 
                        name="password" 
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-200 bg-gray-200 w-full rounded-xl p-3 mt-2 text-black focus:border-green-100 focus:outline-none mb-5 " autoComplete="true"/>

                    <input 
                        type="submit"
                        value="Ingresar"
                        name="sendBtn"
                        id="sendBtn"
                        className="py-4 px-20 md:w-auto w-full  bg-indigo-800 text-white text-lg font-bold mt-3 hover:cursor-pointer hover:bg-indigo-950 uppercase rounded-xl"
                    />
                </form>
                
                <nav className="mt-8 md:flex md:justify-between">
                    <Link to="/register" className="block text-gray-500">¿No tienes una cuenta? Regístrate</Link>
                    <Link to="/forgot-password" className="block text-gray-500">¿Olvidaste tu contraseña?</Link>
                </nav>
            </div>
        </>
    )
}

export default login