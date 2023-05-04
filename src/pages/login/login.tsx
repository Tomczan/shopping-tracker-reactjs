import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

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
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}

export default Login
