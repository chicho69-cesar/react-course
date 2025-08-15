import { tesloApi } from "@/api/teslo-api"
import type { ProductsResponse } from "@/interfaces/products.response"

interface Options {
  limit?: number | string
  offset?: number | string
  sizes?: string
  gender?: string
  minPrice?: number
  maxPrice?: number
  query?: string
}

export async function getProductsAction(options: Options) {
  const { limit, offset, sizes, gender, minPrice, maxPrice, query } = options

  const { data } = await tesloApi.get<ProductsResponse>("/products", {
    params: {
      limit,
      offset,
      gender,
      sizes,
      minPrice,
      maxPrice,
      q: query
    }
  })

  const productsWithImageUrls = data.products.map((product) => ({
    ...product,
    images: product.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`
    ),
  }))

  return {
    ...data,
    products: productsWithImageUrls,
  }
}
