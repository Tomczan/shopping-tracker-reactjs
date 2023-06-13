import { Navigate } from "react-router-dom"
import { DashboardLayout } from "../pages/dashboard/dashboardLayout"
import { Products } from "../pages/dashboard/products/products"
import PrivateRoute from "../utils/PrivateRoute"

export const dashboardRoutes = [
  { path: "/dashboard/", element: <Navigate to="/dashboard/products" /> },
  {
    path: "/dashboard/products/",
    element: (
      <PrivateRoute>
        <DashboardLayout>
          <Products />
        </DashboardLayout>
      </PrivateRoute>
    ),
  },
]
