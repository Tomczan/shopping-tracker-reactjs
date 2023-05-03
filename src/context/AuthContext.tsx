import { createContext, useState, useEffect } from "react"
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance"
import axios from "axios"

export type AuthTokensType = {
  refresh: string
  access: string
}

type AuthContextType = {
  username: string | null
  authToken: AuthTokensType | null
  isAuthenticated: boolean
  loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | null
  logoutUser: () => void | null
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  authToken: null,
  isAuthenticated: false,
  loginUser: () => null,
  logoutUser: () => null,
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate()

  const getUsernameFromToken = (accessToken: string): string => {
    let tokenData: any = jwt_decode(accessToken)
    return tokenData.name
  }

  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username") ? localStorage.getItem("username") : null
  )
  const [storedAuthToken, setAuthToken] = useState<AuthTokensType | null>(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens")!)
      : null
  )
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("isAuthenticated")
      ? Boolean(localStorage.getItem("isAuthenticated"))
      : false
  )

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const login = e.currentTarget.elements.namedItem(
      "username"
    ) as HTMLInputElement
    const password = e.currentTarget.elements.namedItem(
      "password"
    ) as HTMLInputElement
    await fetchUser(login.value, password.value)
  }

  const fetchUser = async (login: string, password: string) => {
    await axiosInstance
      .post("api/token/", {
        username: login,
        password: password,
      })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          let data = response.data
          let usernameFromToken = getUsernameFromToken(data.access)
          setAuthToken(data)
          setIsAuthenticated(true)
          setUsername(usernameFromToken)
          localStorage.setItem("authTokens", JSON.stringify(data))
          localStorage.setItem("isAuthenticated", JSON.stringify(true))
          localStorage.setItem("username", JSON.stringify(usernameFromToken))
          navigate(-1)
        }
      })
      .catch((error) => {
        console.log(`error: ${error}`)
      })
  }

  const logoutUser = () => {
    setAuthToken(null)
    setUsername(null)
    localStorage.removeItem("authTokens")
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("username")
    navigate("/login")
  }

  // const updateToken = async () => {
  //   console.log("Update token called")
  //   let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ refresh: storedAuthToken?.refresh }),
  //   })

  //   if (response.status === 200) {
  //     let data = await response.json()
  //     setAuthToken(data)
  //     setUsername(getUsernameFromToken(data.access))
  //     localStorage.setItem("authTokens", JSON.stringify(data))
  //   } else {
  //     logoutUser()
  //   }
  // }

  let contextData = {
    username: username,
    authToken: storedAuthToken,
    loginUser: loginUser,
    logoutUser: logoutUser,
    isAuthenticated: isAuthenticated,
  }

  // useEffect(() => {
  //   }, [])

  return (
    <AuthContext.Provider value={{ ...contextData }}>
      {children}
    </AuthContext.Provider>
  )
}
