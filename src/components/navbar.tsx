import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Navbar = () => {
  let authContext = useContext(AuthContext)

  return (
    <div className="flex flex-row bg-blue-500 shadow-md text-white w-screen h-8 items-center">
      <div className="basis-1/4 ml-4 ">
        <Link to="/">Home</Link>
      </div>
      <div className="basis-1/2 ">Option 2</div>
      <div className="basis-1/4 flex flex-row">
        <p className="basis-1/4">1</p>
        <div className="basis-1/4">2</div>
        <p className="basis-1/4">3</p>
        <p className="basis-1/4 mr-4">
          {authContext?.authToken ? (
            <p onClick={authContext.logoutUser}>Logout</p>
          ) : (
            <Link to="/login/">Login</Link>
          )}
        </p>
      </div>
    </div>
  )
}

export default Navbar
