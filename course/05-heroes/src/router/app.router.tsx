import { lazy } from "react"
import { createHashRouter, Navigate } from "react-router"

import AdminLayout from "@/admin/layouts/admin-layout"
import AdminPage from "@/admin/pages/admin-page"
import HeroesLayout from "@/heroes/layouts/heroes-layout"
import HeroPage from "@/heroes/pages/hero/hero-page"
import HomePage from "@/heroes/pages/home/home-page"
// import SearchPage from "@/heroes/pages/search/search-page"
const SearchPage = lazy(() => import("@/heroes/pages/search/search-page"))

export const appRouter = createHashRouter([
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "heroes/:heroId",
        element: <HeroPage />
      },
      {
        path: "search",
        element: <SearchPage />
      },
      {
        path: "*",
        element: <Navigate to="/" replace />
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />
      }
    ]
  }
])
