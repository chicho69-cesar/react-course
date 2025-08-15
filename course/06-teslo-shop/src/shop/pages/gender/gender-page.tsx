import CustomPagination from "@/components/custom/custom-pagination"
import CustomJumbotron from "@/shop/components/custom-jumbotron"
import ProductsGrid from "@/shop/components/products-grid"
import useProducts from "@/shop/hooks/use-products"
import { useParams } from "react-router"

export default function GenderPage() {
  const { gender } = useParams()
  const { data } = useProducts()

  const genderLabel = gender === 'men' ? 'Hombres' : gender === 'women' ? 'Mujeres' : 'Niños'

  return (
    <>
      <CustomJumbotron title={`Productos para ${genderLabel}`} />
      <ProductsGrid products={data?.products || []} />
      <CustomPagination totalPages={data?.pages || 1} />
    </>
  )
}
