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

  const getDecodedUsername = (accessToken: string): string => {
    let decodedData: any = jwt_decode(accessToken)
    return decodedData.name
  }

  let localStorageTokens = localStorage.getItem("authTokens")
  let parsedLocalStorageTokens: AuthTokensType = localStorageTokens
    ? JSON.parse(localStorageTokens)
    : null

  const [storedUsername, setUsername] = useState<string | null>(() =>
    getDecodedUsername(parsedLocalStorageTokens.access)
  )
  const [storedAuthToken, setAuthToken] = useState<AuthTokensType | null>(
    () => parsedLocalStorageTokens
  )
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

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
          setAuthToken(data)
          setUsername(getDecodedUsername(data.access))
          localStorage.setItem("authTokens", JSON.stringify(data))
          setIsAuthenticated(true)
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
    localStorage.removeItem("AuthTokens")
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
  //     setUsername(getDecodedUsername(data.access))
  //     localStorage.setItem("authTokens", JSON.stringify(data))
  //   } else {
  //     logoutUser()
  //   }
  // }

  let contextData = {
    username: storedUsername,
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
