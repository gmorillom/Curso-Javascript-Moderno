import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './Layouts/AuthLayout'
import Login from './pages/login'
import RegisterVeterinario from './pages/register-veterinario'
import ConfirmPassword from './pages/confirm-password'
import ForgotPassword from './pages/forgot-password'
import ConfirmAccount from './pages/confirm-account'

function App() {
  console.log(import.meta.env.VITE_BACKEND_URL)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />}></Route>
          <Route path="/register" element={<RegisterVeterinario />}></Route>
          <Route path="/confirm-account/:id" element={<ConfirmAccount />}></Route>
          <Route path="/confirm-password" element={<ConfirmPassword />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
