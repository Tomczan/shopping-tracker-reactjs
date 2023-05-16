import { createContext, useState, useEffect } from "react"
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance"
import axios from "axios"
import { useCookies } from "react-cookie"
import useAuth from "../hooks/useAuth"

type AuthContextType = {
  username: string | null
  authToken: string | null
  authRefreshToken: string | null
  isAuthenticated: boolean
  loginUser: (login: string, password: string) => Promise<void> | null
  logoutUser: () => void | null
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  authToken: null,
  authRefreshToken: null,
  isAuthenticated: false,
  loginUser: () => null,
  logoutUser: () => null,
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate()
  const { fetchUser, setTokensCookies } = useAuth()

  const [cookies, removeCookie] = useCookies(["token", "refreshToken"])
  console.log(cookies.token)

  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username") ? localStorage.getItem("username") : null
  )
  const [storedAuthToken, setAuthToken] = useState<string | null>(
    cookies.token ? cookies.token : null
  )
  const [storedRefreshAuthToken, setRefreshAuthToken] = useState<string | null>(
    cookies.refreshToken ? cookies.refreshToken : null
  )
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("isAuthenticated")
      ? Boolean(localStorage.getItem("isAuthenticated"))
      : false
  )

  const loginUser = async (
    login: string,
    password: string,
    navigateTo: any = -1
  ) => {
    try {
      let tokens = await fetchUser(login, password)
      setAuthToken(tokens.access)
      setRefreshAuthToken(tokens.refresh)
      setIsAuthenticated(true)
      localStorage.setItem("isAuthenticated", JSON.stringify(true))
      setTokensCookies(tokens)
      let decodedToken: any = jwt_decode(tokens.access)
      localStorage.setItem("username", JSON.stringify(decodedToken.name))
      setUsername(decodedToken.name)
      navigate(navigateTo)
    } catch (error) {
      console.log(`error in AuthProvider ${error}`)
    }
  }

  const logoutUser = () => {
    setAuthToken(null)
    setUsername(null)
    setIsAuthenticated(false)
    removeCookie("token", { path: "/" })
    removeCookie("refreshToken", { path: "/" })

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

  return (
    <AuthContext.Provider
      value={{
        username: username,
        authToken: storedAuthToken,
        authRefreshToken: storedRefreshAuthToken,
        loginUser: loginUser,
        logoutUser: logoutUser,
        isAuthenticated: isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
