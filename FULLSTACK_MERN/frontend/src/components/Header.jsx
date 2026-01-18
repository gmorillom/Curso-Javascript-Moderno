import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function Header() {
  const {logOut} = useAuth()

  return (
    <>
      <header className="py-10 bg-indigo-700">
        <div className="container flex justify-between items-center mx-auto flex-col md:flex-row">
          <h1 className="text-indigo-200 font-bold text-3xl text-center">Administrador de Pacientes de {""} <span className="text-white">Veterinaria</span></h1>
          <nav className="flex gap-4 flex-col md:flex-row items-center mt-10 md:mt-0">
            <Link to="/admin" className="uppercase text-white font-bold">Pacientes</Link>
            <Link to="/admin" className="uppercase text-white font-bold">Perfil</Link>
            <button
              type="button"
              className="uppercase text-white font-bold"
              onClick={logOut}
              >
              Cerrar sesión
            </button>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header