import AdminLayout from "@/admin/layouts/admin-layout"
import DashboardPage from "@/admin/pages/dashboard/dashboard-page"
import AdminProductPage from "@/admin/pages/product/admin-product-page"
import AdminProductsPage from "@/admin/pages/products/admin-products-page"
import AuthLayout from "@/auth/layouts/auth-layout"
import LoginPage from "@/auth/pages/login/login-page"
import RegisterPage from "@/auth/pages/register/register-page"
import { AdminRoute, NotAuthenticatedRoute } from "@/components/routes/protected-routes"
import ShopLayout from "@/shop/layouts/shop-layout"
import GenderPage from "@/shop/pages/gender/gender-page"
import HomePage from "@/shop/pages/home/home-page"
import ProductPage from "@/shop/pages/product/product-page"
import { createBrowserRouter, Navigate } from "react-router"

export const appRouter = createBrowserRouter([
  {
    path: "",
    element: <ShopLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "product/:id",
        element: <ProductPage />
      },
      {
        path: "gender/:gender",
        element: <GenderPage />
      }
    ]
  },
  {
    path: '/auth',
    element: (
      <NotAuthenticatedRoute>
        <AuthLayout />
      </NotAuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'products',
        element: <AdminProductsPage />,
      },
      {
        path: 'products/:id',
        element: <AdminProductPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
])
