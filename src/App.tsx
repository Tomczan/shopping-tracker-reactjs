import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/home/home"
import { Navbar } from "./components/navbar"
import Login from "./pages/login/login"
import { PrivateRoute } from "./utils/PrivateRoute"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute outlet={<Home />} />}></Route>
          <Route path="/login/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
