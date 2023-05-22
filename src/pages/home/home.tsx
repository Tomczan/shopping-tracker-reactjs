import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

const Home = () => {
  let { username, authToken } = useContext(AuthContext)

  return (
    <>
      <h1 className="text-3xl font-bold text-green-500 underline hover:text-blue-500 ">
        Home page
      </h1>
      <p>username: {username}</p>
      <pre>{JSON.stringify(authToken, null, 2)}</pre>
    </>
  )
}

export default Home
