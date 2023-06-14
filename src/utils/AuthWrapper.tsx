import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"

export type PrivateRouteProps = {
  children: JSX.Element
}

const AuthWrapper = ({ children }: PrivateRouteProps) => {
  let { isAuthenticated, authRefreshToken } = useContext(AuthContext)
  console.log(isAuthenticated)

  if (!isAuthenticated || !authRefreshToken) {
    console.log("not authorized, navigating...")
    return <Navigate to={"/login"} />
  }

  return children
}

export default AuthWrapper
