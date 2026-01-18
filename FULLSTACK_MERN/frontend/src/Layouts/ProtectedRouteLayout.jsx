import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import Footer from '../components/Footer'

function ProtectedRouteLayout() {
    const {auth, loadingAuth} = useAuth()

    if(loadingAuth) return 'cargando...'

    return (
        <>
            <Header />
            <div>
                {auth?._id ? (<main className="container mt-10 mb-10">
                    <Outlet />
                </main>) : <Navigate to="/" />}
            </div>
            <Footer />
        </>
    )
}

export default ProtectedRouteLayout