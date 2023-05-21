import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

const Login = () => {
  let authContext = useContext(AuthContext)
  const [login, setLogin] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          authContext!.loginUser(login, password)
        }}
      >
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(event) => setLogin(event.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}

export default Login
