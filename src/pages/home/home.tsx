import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const Home = () => {
  let { username } = useContext(AuthContext) ?? {}

  return (
    <>
      <h1 className="text-green-500 hover:text-blue-500 text-3xl font-bold underline ">
        Home page
      </h1>
      <p>username: {username}</p>
      {/* <pre>{JSON.stringify(authContext, null, 2)}</pre> */}
    </>
  )
}

export default Home
