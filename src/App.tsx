import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from "./pages/home/home"
import Navbar from "./components/navbar"
import Login from "./pages/login/login"
import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from "./contexts/AuthContext"
import { Products } from "./pages/dashboard/products/products"
import { DashboardLayout } from "./pages/dashboard/dashboardLayout"

const routePaths = [
  { path: "/", element: <PrivateRoute children={<Home />} /> },
  { path: "/dashboard/", element: <Navigate to="/dashboard/products" /> },
  {
    path: "/dashboard/products/",
    element: (
      <PrivateRoute>
        <DashboardLayout>
          <Products />
        </DashboardLayout>
      </PrivateRoute>
    ),
  },
  { path: "/login/", element: <Login /> },
]

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          {routePaths.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
