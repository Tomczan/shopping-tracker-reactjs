import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export type PrivateRouteProps = {
  children: JSX.Element
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  let authContext = useContext(AuthContext)
  const isAuthenticated = authContext?.authToken ? true : false
  console.log(isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  return children
}

export default PrivateRoute
