import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { MenuIcon, X as CloseIcon } from "lucide-react"

const Navbar = () => {
  let authContext = useContext(AuthContext)

  return (
    <nav className="border-b border-slate-900/10 bg-slate-100 bg-opacity-60 dark:border-slate-400 dark:bg-slate-900">
      <div className="mx-auto mb-3 max-w-7xl pt-4 sm:px-6">
        <div className="ml-4 flex h-8 justify-between">
          <div className=" flex items-center">
            <Link
              to="/"
              className="text-3xl font-medium tracking-wide transition hover:text-blue-500"
            >
              Home
            </Link>
          </div>

          <ul className="mx-4 hidden items-center transition md:flex">
            <li>
              <a
                href="#"
                className="mx-2 text-lg duration-500 hover:text-cyan-500 md:my-0"
              >
                Option 1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="mx-2  bg-transparent  p-0 text-lg transition hover:text-blue-500"
              >
                Option 2
              </a>
            </li>
            <li>
              <a
                href="#"
                className="mx-2  bg-transparent  p-0 text-lg transition hover:text-blue-500"
              >
                Option 3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="mx-2 bg-transparent p-0 text-lg transition hover:text-blue-500"
              >
                Option 4
              </a>
            </li>
          </ul>

          <div className="mr-4 flex w-12 items-center">
            {authContext?.authToken ? (
              <button
                onClick={authContext.logoutUser}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-400"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="rounded-md px-3 text-sm font-medium hover:bg-blue-400"
              >
                Logout
              </Link>
            )}
            <MenuIcon className="md:hidden" />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
