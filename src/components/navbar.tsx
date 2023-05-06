import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Navbar = () => {
  let authContext = useContext(AuthContext)

  return (
    <nav className="bg-blue-500 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-white font-medium tracking-wide text-2xl pr-6"
            >
              Home
            </Link>
            <Link
              to="/option2"
              className="text-white hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              Option 1
            </Link>
            <Link
              to="/option2"
              className="text-white hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              Option 2
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <Link
                to="/page1"
                className="text-white hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Option 3
              </Link>
              <Link
                to="/page2"
                className="text-white hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Option 4
              </Link>
              {authContext?.authToken ? (
                <button
                  onClick={authContext.logoutUser}
                  className="text-white hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-white hover:bg-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
