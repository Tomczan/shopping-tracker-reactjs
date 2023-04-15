import { Navigate } from "react-router-dom"

export type PrivateRouteProps = {
  outlet: JSX.Element
}

export const PrivateRoute = ({ outlet }: PrivateRouteProps) => {
  const isAuthenticated = false
  if (isAuthenticated) {
    return outlet
  } else {
    return <Navigate to={"/login"} />
  }
}
