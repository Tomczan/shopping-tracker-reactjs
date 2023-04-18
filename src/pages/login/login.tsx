import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"

const Login = () => {
  let authContext = useContext(AuthContext)

  return (
    <div>
      <form
        onSubmit={(e) => {
          authContext!.loginUser(e)
        }}
      >
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <input type="submit" />
      </form>
    </div>
  )
}

export default Login
