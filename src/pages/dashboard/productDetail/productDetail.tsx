import { useParams } from "react-router-dom"
import useProduct, { Product } from "../useProduct"

export const ProductDetails = () => {
  const { id } = useParams()
  const { getProductDetail } = useProduct()

  if (typeof id !== "string") {
    // TODO: display error and navigate to idk previous page maybe
    return <div>Error id is not string</div>
  }

  const { data, isLoading } = getProductDetail(id)

  if (isLoading) {
    return <div>Loading</div>
  }

  if (data === undefined) {
    // TODO: how to handle this
    return <div>Data is undefinied</div>
  }

  console.log("przed reduce")
  const { openProducts, closedProducts } = data.reduce(
    (result, product) => {
      if (product.finished) {
        result.closedProducts.push(product)
      } else {
        result.openProducts.push(product)
      }
      return result
    },
    { openProducts: [] as Product[], closedProducts: [] as Product[] }
  )
  console.log("po reduce")

  return (
    <div>
      <p>Open products</p>
      {openProducts.map((item) => (
        <div
          className="ml-2 h-56 w-64 rounded-lg border bg-slate-400 p-8 shadow-sm"
          key={item.id}
        >
          <span> Nazwa: {item.product.name}</span>
          <br />
          <span> Cena: {item.price}</span>
          <p>{item.finished ? "Zamkniety" : "Otwarty"}</p>
        </div>
      ))}

      <p>Closed products</p>
      {closedProducts.map((item) => (
        <div
          className="ml-2 h-56 w-64 rounded-lg border bg-slate-400 p-8 shadow-sm"
          key={item.id}
        >
          <span> Nazwa: {item.product.name}</span>
          <br />
          <span> Cena: {item.price}</span>
          <p>{item.finished ? "Zamkniety" : "Otwarty"}</p>
        </div>
      ))}
    </div>
  )
}
