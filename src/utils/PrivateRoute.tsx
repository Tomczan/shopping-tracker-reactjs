import { Navigate } from "react-router-dom"

export type PrivateRouteProps = {
  children: JSX.Element
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = false

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  return children
}
