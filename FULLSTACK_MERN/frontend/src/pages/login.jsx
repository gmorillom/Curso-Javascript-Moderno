import { Link } from "react-router-dom"

function login() {
  return (
    <>
        <div className="mb-10">
            <h1 className="block text-6xl font-black text-indigo-700">
                Inicia sesión para administrar tus <span className="text-black">pacientes</span>
            </h1>
        </div>
        <div className="shadow-lg rounded-xl bg-white py-10 px-5">
            <form>
                <label htmlFor="email" className="uppercase text-gray-600 text-xl font-bold">Correo</label>
                <input 
                    type="email" 
                    placeholder="example@gmail.com" 
                    name="email" 
                    id="email"
                    className="border border-gray-200 bg-gray-200 w-full rounded-xl p-3 mt-2 text-black focus:border-gray-100 focus:outline-none mb-5" autoComplete="true"/>

                <label htmlFor="password" className="uppercase text-gray-600 text-xl font-bold">Contraseña</label>
                <input 
                    type="password" 
                    placeholder="Clave de acceso" 
                    name="password" 
                    id="password"
                    className="border border-gray-200 bg-gray-200 w-full rounded-xl p-3 mt-2 text-black focus:border-green-100 focus:outline-none mb-5 " autoComplete="true"/>

                <input 
                    type="submit"
                    value="Ingresar"
                    name="sendBtn"
                    id="sendBtn"
                    className="py-4 px-20 md:w-auto w-full  bg-indigo-800 text-white text-lg font-bold mt-3 hover:cursor-pointer hover:bg-indigo-950 uppercase"
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