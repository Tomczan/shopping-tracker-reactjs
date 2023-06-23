import Home from "../pages/home/home"
import Login from "../pages/login/login"
import PrivateRoute from "../utils/AuthWrapper"

export const publicRoutes = [
  { path: "/", element: <PrivateRoute children={<Home />} /> },
  { path: "/login/", element: <Login /> },
]
