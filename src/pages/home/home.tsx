import { useContext } from "react"
import AuthContext from "../../context/AuthContext"

const Home = () => {
  let { username } = useContext(AuthContext)

  return (
    <>
      <h1 className="text-green-500 hover:text-blue-500 text-3xl font-bold underline ">
        Home page
      </h1>
      <p>username: {username}</p>
    </>
  )
}

export default Home
