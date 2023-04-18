import { createContext, useState, useEffect } from "react"

type AuthContextType = {
  username: string | null
  authToken: string | null
  loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [storedUsername, setUsername] = useState<string | null>(null)
  const [storedAuthToken, setAuthToken] = useState<string | null>(null)

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
    let data = await response.json()
    console.log(data)
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
