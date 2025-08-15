import { Outlet } from "react-router"
import CustomFooter from "../components/custom-footer"
import CustomHeader from "../components/custom-header"

export default function ShopLayout() {
  return (
    <div className="min-h-screen bg-background">
      <CustomHeader />
      <Outlet />
      <CustomFooter />
    </div>
  )
}
