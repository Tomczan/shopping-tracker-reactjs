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

  const getUserProducts = (): Promise<IProduct[]> => {
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

  return {
    getUserProducts,
  }
}

export default useProduct
