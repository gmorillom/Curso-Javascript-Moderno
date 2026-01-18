import { useState, useEffect, createContext } from 'react'
import axiosCLI from '../config/axiosClient'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [loadingAuth, setLoadingAuth] = useState(true)

    const getUserProfile = async () => {
        const token = localStorage.getItem('token')

        if(!token){
            setLoadingAuth(false)
            return
        }

        try {
            const { data } = await axiosCLI('/veterinarios/profile',{
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            setAuth(data)
        } catch (error) {
            console.error(error.response.data.message)
            setAuth({})
        }

        setLoadingAuth(false)
    }

    const logOut = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    useEffect(() => {
        getUserProfile()

    }, [])
    
    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            loadingAuth,
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext