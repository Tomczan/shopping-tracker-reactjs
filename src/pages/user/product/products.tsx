import useAuthAxios from "../../../hooks/useAuthAxios"
import { useEffect, useState } from "react"

const UserProducts = () => {
  const api = useAuthAxios()
  const [result, setResult] = useState(null)

  const fetchData = async () => {
    try {
      const response = await api.get("api/my-products/")
      setResult(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log("eee")
    fetchData()
  }, [])

  console.log(result)

  return (
    <>
      <h1 className="text-3xl font-bold text-green-500 underline hover:text-blue-500 ">
        Product page
      </h1>
    </>
  )
}

export default UserProducts
