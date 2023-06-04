import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="mx-4 flex border-r border-r-emerald-600 p-8">
        <ul>
          <li>left element 1</li>
        </ul>
      </div>
      <div className="m-4 grid w-full grid-cols-4  gap-4 rounded-lg border p-4">
        <div className="h-56 rounded-lg border p-8 shadow-sm">ITEM</div>
        <div className="h-56 rounded-lg border p-8 shadow-sm">ITEM</div>
        <div className="h-56 rounded-lg border p-8 shadow-sm">ITEM</div>
        <div className="h-56 rounded-lg border p-8 shadow-sm">ITEM</div>
        <div className="h-56 rounded-lg border p-8 shadow-sm">ITEM</div>
        <div className="h-56 rounded-lg border p-8 shadow-sm">ITEM</div>
        <div className="h-56 rounded-lg border p-8 shadow-sm">ITEM</div>
      </div>
    </div>
  )
}

export default Dashboard
