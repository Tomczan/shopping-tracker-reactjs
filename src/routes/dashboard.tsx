import { Navigate } from "react-router-dom"
import { DashboardLayout } from "../layouts/dashboardLayout"
import { Products } from "../pages/dashboard/productList/productList"
import AuthWrapper from "../utils/AuthWrapper"
import Product from "../pages/dashboard/product/product"

export const dashboardRoutes = [
  { path: "/dashboard/", element: <Navigate to="/dashboard/products" /> },
  {
    path: "/dashboard/products/",
    element: (
      <AuthWrapper>
        <DashboardLayout>
          <Products />
        </DashboardLayout>
      </AuthWrapper>
    ),
  },
  { path: "/product/:id", element: <Product /> },
]
