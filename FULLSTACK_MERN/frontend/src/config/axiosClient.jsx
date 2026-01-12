import axios from "axios"

const axiosCLI = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/`
})

export default axiosCLI