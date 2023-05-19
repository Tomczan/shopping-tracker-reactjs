import { createContext, useState } from "react"
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom"
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
  const {
    obtainToken,
    setAccessTokenCookie,
    setRefreshTokenCookie,
    removeJwtCookies,
  } = useAuth()

  const [cookies] = useCookies(["accessToken", "refreshToken"])

  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username") || null
  )

  const [accessToken, setAccessToken] = useState<string | null>(
    cookies.accessToken || null
  )

  const [refreshToken, setRefreshToken] = useState<string | null>(
    cookies.refreshToken || null
  )

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("isAuthenticated") && refreshToken
      ? Boolean(localStorage.getItem("isAuthenticated"))
      : false
  )

  const loginUser = async (
    login: string,
    password: string,
    navigateTo: string = "/"
  ): Promise<void> => {
    try {
      let tokens = await obtainToken(login, password)
      setAccessToken(tokens.access)
      setAccessTokenCookie(tokens.access)
      setRefreshToken(tokens.refresh)
      setRefreshTokenCookie(tokens.refresh)
      setIsAuthenticated(true)
      let decodedToken: any = jwt_decode(tokens.access)
      localStorage.setItem("isAuthenticated", JSON.stringify(true))
      localStorage.setItem("username", JSON.stringify(decodedToken.name))
      setUsername(decodedToken.name)
      navigate(navigateTo)
    } catch (error) {
      console.log(`error in AuthProvider ${error}`)
    }
  }

  const logoutUser = (): void => {
    setAccessToken(null)
    setUsername(null)
    setIsAuthenticated(false)
    removeJwtCookies()
    localStorage.removeItem("username")
    localStorage.setItem("isAuthenticated", JSON.stringify(false))
    navigate("/login")
  }

  // const updateToken = async () => {
  //   console.log("Update token called")
  //   let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ refresh: accessToken?.refresh }),
  //   })

  //   if (response.status === 200) {
  //     let data = await response.json()
  //     setAccessToken(data)
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
        authToken: accessToken,
        authRefreshToken: refreshToken,
        loginUser: loginUser,
        logoutUser: logoutUser,
        isAuthenticated: isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
