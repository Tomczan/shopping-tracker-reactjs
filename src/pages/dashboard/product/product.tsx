import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useProduct, { IProduct } from "../useProduct"

const Product = () => {
  const { id } = useParams()
  const { getProductDetail } = useProduct()
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductDetail(id!)
        setProducts(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      {" "}
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
  )
}

export default Product
