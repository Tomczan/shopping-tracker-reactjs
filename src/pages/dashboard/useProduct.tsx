import { useQuery } from "@tanstack/react-query"
import useAuthAxios from "../../hooks/useAuthAxios"

export type Product = {
  id: number
  created: string
  discount_price: string
  finished: null | string
  opened: null | string
  price: string
  product: {
    id: number
    brand: string
    name: string
  }
  shop: {
    id: number
    name: string
  }
  updated: string
}

const useProduct = () => {
  const api = useAuthAxios()

  const getProducts = () => {
    return useQuery({
      queryKey: ["productList"],
      queryFn: async () => {
        const data = await api
          .get("api/my-products/")
          .then((response) => {
            if (response.status === 200) {
              return response.data as Product[]
            } else {
              throw new Error("Failed to fetch user's products.")
            }
          })
          .catch((error) => {
            console.error(error)
            throw error
          })
        return data
      },
    })
  }

  const getProductDetail = (id: string) => {
    return useQuery({
      queryKey: ["productDetail"],
      queryFn: async () => {
        const data = await api
          .get(`api/my-products/${id}`)
          .then((response) => {
            if (response.status === 200) {
              return response.data as Product[]
            } else {
              throw new Error("Failed to fetch user's product detail.")
            }
          })
          .catch((error) => {
            throw error
          })
        return data
      },
    })
  }

  return {
    getProducts,
    getProductDetail,
  }
}

export default useProduct
