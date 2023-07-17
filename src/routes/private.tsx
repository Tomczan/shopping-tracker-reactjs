import { Navigate } from "react-router-dom"
import { DashboardLayout } from "../layouts/dashboardLayout"
import { ProductList } from "../pages/dashboard/productList/productList"
import { ProductDetails } from "../pages/dashboard/productDetail/productDetail"
import AuthWrapper from "../utils/AuthWrapper"

export const privateRoutes = [
  { path: "/dashboard/", element: <Navigate to="/dashboard/product-list/" /> },
  {
    path: "/dashboard/product-list/",
    element: (
      <AuthWrapper>
        <DashboardLayout>
          <ProductList />
        </DashboardLayout>
      </AuthWrapper>
    ),
  },
  {
    path: "/dashboard/product/:id",
    element: (
      <AuthWrapper>
        <DashboardLayout>
          <ProductDetails />
        </DashboardLayout>
      </AuthWrapper>
    ),
  },
]
