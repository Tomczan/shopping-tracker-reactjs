import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { MenuIcon, X as CloseIcon } from "lucide-react"

const navigation: { name: string; href: string }[] = [
  { name: "Option 1", href: "#" },
  { name: "Option 2", href: "#" },
  { name: "Option 3", href: "#" },
  { name: "Option 4", href: "#" },
]

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  // document.body.classList.add("dark")
  let { isAuthenticated, logoutUser } = useContext(AuthContext)

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="mb-3 border-b border-slate-900/10 bg-slate-100 bg-opacity-60 px-6 py-1">
      <div className="flex items-center justify-between">
        <div className="">
          <Link
            to="/"
            className="text-3xl font-medium tracking-wide transition hover:text-blue-500"
          >
            Home
          </Link>
        </div>

        <div
          className={`${
            isMobileMenuOpen ? "fixed translate-x-0" : "translate-x-[100%]"
          } absolute inset-0 flex flex-col items-center gap-12 overflow-hidden bg-black bg-opacity-20 p-8 pt-24 backdrop-blur-sm transition ease-out md:static md:ml-0  md:flex md:translate-x-0 md:flex-row md:bg-inherit md:p-0 md:pt-0 md:backdrop-blur-0 md:duration-0`}
        >
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-lg hover:text-cyan-500 md:my-0"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex gap-2">
          <div className={`${isMobileMenuOpen ? "hidden" : "flex "}`}>
            {isAuthenticated ? (
              <button
                onClick={logoutUser}
                className="rounded-md  hover:bg-blue-400"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="rounded-md  hover:bg-blue-400">
                Login
              </Link>
            )}
          </div>
          <div className="z-50 block md:hidden">
            {isMobileMenuOpen ? (
              <CloseIcon onClick={toggleMenu} />
            ) : (
              <MenuIcon onClick={toggleMenu} />
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
