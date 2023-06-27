import { Navigate } from "react-router-dom"
import { DashboardLayout } from "../layouts/dashboardLayout"
import { Products } from "../pages/dashboard/productList/productList"
import AuthWrapper from "../utils/AuthWrapper"
import Product from "../pages/dashboard/product/product"

export const dashboardRoutes = [
  { path: "/dashboard/", element: <Navigate to="/dashboard/product-list/" /> },
  {
    path: "/dashboard/product-list/",
    element: (
      <AuthWrapper>
        <DashboardLayout>
          <Products />
        </DashboardLayout>
      </AuthWrapper>
    ),
  },
  {
    path: "/dashboard/product/:id",
    element: (
      <AuthWrapper>
        <DashboardLayout>
          <Product />
        </DashboardLayout>
      </AuthWrapper>
    ),
  },
]
