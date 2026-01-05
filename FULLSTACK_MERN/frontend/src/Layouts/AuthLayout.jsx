import { Outlet } from "react-router-dom"

function AuthLayout() {
  return (
    <>
        <main className="container md:grid md:grid-cols-2 mx-auto md:mt-36 mt-16 gap-10 p-2 mh-50">
            <Outlet />
        </main>
    </>
  )
}

export default AuthLayout