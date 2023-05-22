import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"

export type PrivateRouteProps = {
  children: JSX.Element
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  let { isAuthenticated } = useContext(AuthContext)
  console.log(isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  return children
}

export default PrivateRoute
