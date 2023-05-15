import { createContext, useState, useEffect } from "react"
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance"
import axios from "axios"
import { useCookies } from "react-cookie"

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
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "refreshToken",
  ])
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
    await axiosInstance
      .post("api/token/", {
        username: login,
        password: password,
      })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          let data = response.data
          setAuthToken(data.access)
          setRefreshAuthToken(data.refresh)
          setIsAuthenticated(true)
          // token cookie
          let decodedToken: any = jwt_decode(data.access)
          let tokenExpDate = new Date(decodedToken.exp * 1000)
          setCookie("token", data.access, { expires: tokenExpDate })
          // refresh token cookie
          let decodedRefreshToken: any = jwt_decode(data.refresh)
          let refreshTokenExpDate = new Date(decodedRefreshToken.exp * 1000)
          setCookie("refreshToken", data.refresh, {
            expires: refreshTokenExpDate,
          })
          // storage
          localStorage.setItem("isAuthenticated", JSON.stringify(true))
          localStorage.setItem("username", JSON.stringify(decodedToken.name))
          setUsername(decodedToken.name)
          navigate(navigateTo)
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
