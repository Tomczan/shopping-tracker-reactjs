import { useEffect, useState } from "react"
import useProducts, { IProduct } from "./useProducts"

export const Products = () => {
  const { getUserProducts } = useProducts()
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserProducts()
        setProducts(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  console.log(products)

  return (
    <>
      <div className="m-1 grid grid-cols-4 gap-3 rounded-lg border bg-red-400 p-4">
        {products.map((item) => (
          <div
            className="h-56 w-64 rounded-lg border bg-slate-400 p-8 shadow-sm"
            key={item.id}
          >
            <span> Nazwa: {item.product.name}</span>
            <br />
            <span> Cena: {item.price}</span>
          </div>
        ))}
      </div>
    </>
  )
}
