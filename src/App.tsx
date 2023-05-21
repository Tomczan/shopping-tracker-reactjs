import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home/home"
import Navbar from "./components/navbar"
import Login from "./pages/login/login"
import PrivateRoute from "./utils/PrivateRoute"
import { AuthContext, AuthProvider } from "./context/AuthContext"
import UserProducts from "./pages/user/product/products"

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
          <Route path="/login/" element={<Login />}></Route>
          <Route path="/my-products/" element={<UserProducts />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
