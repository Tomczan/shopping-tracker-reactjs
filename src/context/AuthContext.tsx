import { createContext, useState } from "react"
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import useAuth, { AuthTokensType } from "../hooks/useAuth"

type AuthContextType = {
  username: string | null
  authToken: string | null
  authRefreshToken: string | null
  isAuthenticated: boolean
  loginUser: (login: string, password: string) => Promise<void> | null
  logoutUser: () => void | null
  updateUserContext: (tokens: AuthTokensType) => void | null
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  authToken: null,
  authRefreshToken: null,
  isAuthenticated: false,
  loginUser: () => null,
  logoutUser: () => null,
  updateUserContext: () => null,
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
      updateUserContext(tokens)
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

  const updateUserContext = (tokens: AuthTokensType): void => {
    setAccessToken(tokens.access)
    setAccessTokenCookie(tokens.access)
    setRefreshToken(tokens.refresh)
    setRefreshTokenCookie(tokens.refresh)
    setIsAuthenticated(true)
    let decodedToken: any = jwt_decode(tokens.access)
    localStorage.setItem("isAuthenticated", JSON.stringify(true))
    localStorage.setItem("username", JSON.stringify(decodedToken.name))
    setUsername(decodedToken.name)
  }

  return (
    <AuthContext.Provider
      value={{
        username: username,
        authToken: accessToken,
        authRefreshToken: refreshToken,
        loginUser: loginUser,
        logoutUser: logoutUser,
        updateUserContext: updateUserContext,
        isAuthenticated: isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
