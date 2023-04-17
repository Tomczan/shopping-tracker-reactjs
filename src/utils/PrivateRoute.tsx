import { Navigate } from "react-router-dom"

export type PrivateRouteProps = {
  children: JSX.Element
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = true

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  return children
}

export default PrivateRoute
