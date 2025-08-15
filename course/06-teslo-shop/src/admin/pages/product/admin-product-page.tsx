import useProduct from "@/admin/hooks/use-product"
import CustomFullscreenLoader from "@/components/custom/custom-fullscreen-loader"
import type { Product } from "@/interfaces/product.interface"
import { Navigate, useNavigate, useParams } from "react-router"
import { toast } from "sonner"
import { ProductForm } from "./ui/product-form"

export default function AdminProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { isLoading, isError, data: product, mutation } = useProduct(id || "")

  const title = id === "new" ? "Nuevo producto" : "Editar producto"
  const subtitle = id === "new"
    ? "Aquí puedes crear un nuevo producto."
    : "Aquí puedes editar el producto."

  const handleSubmit = async (productLike: Partial<Product> & { files?: File[] }) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success("Producto actualizado correctamente", {
          position: "top-right",
        })

        navigate(`/admin/products/${data.id}`)
      },
      onError: (error) => {
        console.log(error)
        toast.error("Error al actualizar el producto")
      },
    })
  }

  if (isError) {
    return <Navigate to="/admin/products" replace={true} />
  }

  if (isLoading) {
    return <CustomFullscreenLoader />
  }

  if (!product) {
    return <Navigate to="/admin/products" replace={true} />
  }

  return (
    <ProductForm
      title={title}
      subTitle={subtitle}
      product={product}
      onSubmit={handleSubmit}
      isPending={mutation.isPending}
    />
  )
}
