import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home/home"
import Navbar from "./components/navbar"
import Login from "./pages/login/login"
import PrivateRoute from "./utils/PrivateRoute"
import { AuthContext } from "./context/AuthContext"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider
          value={{ isAuthenticated: false, username: "Tomek" }}
        >
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<PrivateRoute children={<Home />} />}
            ></Route>
            <Route path="/login/" element={<Login />}></Route>
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
