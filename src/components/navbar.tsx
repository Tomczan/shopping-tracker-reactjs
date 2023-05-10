import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { MenuIcon, X as CloseIcon } from "lucide-react"

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  // document.body.classList.add("dark")
  let authContext = useContext(AuthContext)

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="mb-3 border-b border-slate-900/10 bg-slate-100 bg-opacity-60 px-6 pt-4 ">
      <div className="flex items-center justify-between">
        <div className="">
          <Link
            to="/"
            className="text-3xl font-medium tracking-wide transition hover:text-blue-500"
          >
            Home
          </Link>
        </div>

        <ul
          className={`${
            isMobileMenuOpen ? "fixed translate-x-0" : "translate-x-[100%]"
          } absolute inset-0 ml-32 flex flex-col gap-12 overflow-hidden bg-black bg-opacity-10 p-8 pt-24 backdrop-blur-sm transition ease-out md:static md:ml-0 md:flex md:translate-x-0 md:flex-row md:bg-inherit md:p-0 md:pt-0 md:backdrop-blur-0 md:duration-0`}
        >
          <li>
            <a href="#" className="text-lg hover:text-cyan-500 md:my-0">
              Option 1
            </a>
          </li>
          <li>
            <a href="#" className="text-lg hover:text-cyan-500 md:my-0">
              Option 2
            </a>
          </li>
          <li>
            <a href="#" className="text-lg hover:text-cyan-500 md:my-0">
              Option 3
            </a>
          </li>
          <li>
            <a href="#" className="text-lg hover:text-cyan-500 md:my-0">
              Option 4
            </a>
          </li>
        </ul>

        <div className="flex gap-2">
          <div className={`${isMobileMenuOpen ? "hidden" : "flex "}`}>
            {authContext?.authToken ? (
              <button
                onClick={authContext.logoutUser}
                className="rounded-md  hover:bg-blue-400"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="rounded-md  hover:bg-blue-400">
                Logout
              </Link>
            )}
          </div>
          <div className="z-50 block md:hidden">
            <MenuIcon onClick={toggleMenu} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
