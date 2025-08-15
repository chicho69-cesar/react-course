import CustomPagination from "@/components/custom/custom-pagination"
import CustomJumbotron from "@/shop/components/custom-jumbotron"
import ProductsGrid from "@/shop/components/products-grid"
import useProducts from "@/shop/hooks/use-products"

export default function HomePage() {
  const { data } = useProducts()

  return (
    <>
      <CustomJumbotron title="Todos los productos" />
      <ProductsGrid products={data?.products || []} />
      <CustomPagination totalPages={data?.pages || 0} />
    </>
  )
}
