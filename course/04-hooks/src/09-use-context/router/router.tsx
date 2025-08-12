import { createBrowserRouter, Navigate } from "react-router"
import AboutPage from "../pages/about/about-page"
import { LoginPage } from "../pages/auth/login-page"
import { ProfilePage } from "../pages/profile/profile-page"

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <AboutPage />
  },
  {
    path: "/profile",
    element: <ProfilePage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
])
