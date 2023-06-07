import { ReactNode } from "react"
import Dashboard from "./dashboard"

interface DashboardLayoutProps {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <div className="flex h-screen">
        <Dashboard />
        <div className="min-h-full w-full bg-blue-300">{children}</div>
      </div>
    </>
  )
}
