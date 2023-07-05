import useAuthAxios from "../../hooks/useAuthAxios"

export interface IProduct {
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

  const getProducts = (): Promise<IProduct[]> => {
    return api
      .get("api/my-products/")
      .then((response) => {
        if (response.status === 200) {
          return response.data as IProduct[]
        } else {
          throw new Error("Failed to fetch user's products.")
        }
      })
      .catch((error) => {
        console.error(error)
        throw error
      })
  }

  const getProductDetail = (id: string): Promise<IProduct[]> => {
    return api
      .get(`api/my-products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data
        } else {
          throw new Error("Failed to fetch user's product detail.")
        }
      })
      .catch((error) => {
        throw error
      })
  }

  return {
    getProducts,
    getProductDetail,
  }
}

export default useProduct
