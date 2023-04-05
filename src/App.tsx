import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/home/home"
import { Navbar } from "./components/navbar"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
