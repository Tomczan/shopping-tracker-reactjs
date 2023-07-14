import useProduct from "../useProduct"
import { Link } from "react-router-dom"

export const ProductList = () => {
  const { getProducts } = useProduct()

  const { data, isLoading } = getProducts()

  if (isLoading) return <div>Loading</div>

  if (data === undefined) {
    // TODO: how to handle this
    return <div>Data is undefinied</div>
  }

  return (
    <div className="m-1 grid grid-cols-4 gap-3 rounded-lg border bg-red-400 p-4">
      {data.map((item) => (
        <div
          className="h-56 w-64 rounded-lg border bg-slate-400 p-8 shadow-sm"
          key={item.id}
        >
          <span> Nazwa: {item.product.name}</span>
          <br />
          <span> Cena: {item.price}</span>
          <p>
            <Link
              to={`/dashboard/product/${item.id}`}
              className="text-3xl font-medium tracking-wide transition hover:text-blue-500"
            >
              Details
            </Link>
          </p>
        </div>
      ))}
    </div>
  )
}
