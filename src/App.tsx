import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import { AuthProvider } from "./contexts/AuthContext"
import { privateRoutes } from "./routes/private"
import { publicRoutes } from "./routes/public"

const routePaths = [...privateRoutes, ...publicRoutes]

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
