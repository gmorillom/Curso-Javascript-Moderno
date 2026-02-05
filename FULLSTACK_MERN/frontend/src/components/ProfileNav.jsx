import { Link } from "react-router-dom"

function ProfileNav() {
  return (
    <nav className="flex gap-4 p-2">
        <Link 
            to="/admin/profile"
            className="uppercase text-gray-600 text-lg font-bold"
            >Editar perfil</Link>
        <Link 
            className="uppercase text-gray-600 text-lg font-bold"
            to="/admin/change-password"
            >Cambiar contraseña</Link>
    </nav>
  )
}

export default ProfileNav