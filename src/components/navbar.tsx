import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Navbar = () => {
  let authContext = useContext(AuthContext)

  return (
    <div className="flex flex-row">
      <div className="basis-1/4 bg-blue-500">01</div>
      <div className="basis-1/2 bg-green-500">02</div>
      <div className="basis-1/4 bg-blue-600 flex flex-row">
        <p className="basis-1/4">
          <Link to="/">Home</Link>
        </p>
        <p className="basis-1/4">
          <Link to="/login/">Login</Link>
          {authContext?.authToken ? (
            <span>Zalogowany</span>
          ) : (
            <span>Niezalogowany</span>
          )}
        </p>
        <p className="basis-1/4">3</p>
        <p className="basis-1/4">4</p>
      </div>
    </div>
  )
}

export default Navbar
