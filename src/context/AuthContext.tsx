import { createContext, useState, useEffect } from "react"

type AuthContextType = {
  isAuthenticated: boolean
  username: string | null
}

type AuthProviderProps = {
  isAuthenticated: boolean
  children: React.ReactNode
  username: string | null
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  username: null,
})

export default AuthContext

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  isAuthenticated,
  username,
}) => {
  return (
    <AuthContext.Provider value={{ isAuthenticated, username }}>
      {children}
    </AuthContext.Provider>
  )
}
