import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home/home"
import Navbar from "./components/navbar"
import Login from "./pages/login/login"
import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from "./contexts/AuthContext"
import { Products } from "./pages/dashboard/products/products"
import { DashboardLayout } from "./pages/dashboard/dashboardLayout"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<PrivateRoute children={<Home />} />}
          ></Route>
          <Route
            path="/dashboard/my-products/"
            element={
              <PrivateRoute
                children={
                  <DashboardLayout>
                    <Products />
                  </DashboardLayout>
                }
              />
            }
          ></Route>
          <Route path="/login/" element={<Login />}></Route>
          {/* <Route path="/my-products/" element={<UserProducts />}></Route> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
