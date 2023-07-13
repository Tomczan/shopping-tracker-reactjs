import { useParams } from "react-router-dom"
import useProduct from "../useProduct"

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

  if (data !== undefined) {
    return (
      <div>
        {data.map((item) => (
          <div
            className="h-56 w-64 rounded-lg border bg-slate-400 p-8 shadow-sm"
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
}
