import { useParams } from "react-router-dom"

const Product = () => {
  const { id } = useParams()
  return <div>Product details o id: {id}</div>
}

export default Product
