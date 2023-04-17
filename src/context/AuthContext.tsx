import { createContext, useState, useEffect } from "react"

type AuthContextType = {
  isAuthenticated: boolean
  username: string | null
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  username: null,
})
