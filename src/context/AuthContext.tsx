import { createContext, useState, useEffect } from "react"
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom"

type AuthTokensType = {
  refresh: string
  access: string
}

type AuthContextType = {
  username: string | null
  authToken: AuthTokensType | null
  loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  logoutUser: () => void
}

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
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
    parsedLocalStorageTokens
      ? getDecodedUsername(parsedLocalStorageTokens.access)
      : null
  )
  const [storedAuthToken, setAuthToken] = useState<AuthTokensType | null>(() =>
    parsedLocalStorageTokens ? parsedLocalStorageTokens : null
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
    let response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: login, password: password }),
    })

    if (response.status === 200) {
      let data = await response.json()
      setAuthToken(data)
      setUsername(getDecodedUsername(data.access))
      localStorage.setItem("authTokens", JSON.stringify(data))
      navigate(-1)
    } else {
      alert("Something went wrong!")
    }
  }

  const logoutUser = () => {
    setAuthToken(null)
    setUsername(null)
    localStorage.removeItem("AuthTokens")
    navigate("/login")
  }

  let contextData = {
    username: storedUsername,
    authToken: storedAuthToken,
    loginUser: loginUser,
    logoutUser: logoutUser,
  }

  return (
    <AuthContext.Provider value={{ ...contextData }}>
      {children}
    </AuthContext.Provider>
  )
}
