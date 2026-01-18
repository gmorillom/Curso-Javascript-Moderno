import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './Layouts/AuthLayout'
import Login from './pages/login'
import RegisterVeterinario from './pages/register-veterinario'
import ConfirmPassword from './pages/confirm-password'
import ForgotPassword from './pages/forgot-password'
import ConfirmAccount from './pages/confirm-account'
import { AuthProvider } from './context/AuthProvider'
import ProtectedRouteLayout from './Layouts/ProtectedRouteLayout'
import AdminPatient from './pages/admin-patient'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />}></Route>
            <Route path="/register" element={<RegisterVeterinario />}></Route>
            <Route path="/confirm-account/:id" element={<ConfirmAccount />}></Route>
            <Route path="/confirm-password/:token" element={<ConfirmPassword />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          </Route>

          <Route path="/admin" element={<ProtectedRouteLayout />}>
            <Route index element={<AdminPatient />}></Route>

          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
