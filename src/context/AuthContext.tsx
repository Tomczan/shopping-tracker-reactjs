import { createContext, useState, useEffect } from "react"
import jwt_decode from "jwt-decode"

type AuthTokensType = {
  refresh: string
  access: string
}

type AuthContextType = {
  username: string | null
  authToken: AuthTokensType | null
  loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [storedUsername, setUsername] = useState<string | null>(null)
  const [storedAuthToken, setAuthToken] = useState<AuthTokensType | null>(null)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
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
      let decodedData: any = jwt_decode(data.access)
      setAuthToken(data)
      setUsername(decodedData.name)
    } else {
      alert("Something went wrong!")
    }
  }

  let contextData = {
    username: storedUsername,
    authToken: storedAuthToken,
    loginUser: handleLogin,
  }

  return (
    <AuthContext.Provider value={{ ...contextData }}>
      {children}
    </AuthContext.Provider>
  )
}
