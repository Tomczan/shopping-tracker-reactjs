import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Products } from "./products/products"

const Dashboard = () => {
  return (
    <>
      <div className="mx-4 flex h-auto w-1/5 border-r border-r-slate-300 p-8">
        <ul>
          <li>filters</li>
          <li>settings</li>
          <li>some other options</li>
        </ul>
      </div>
    </>
  )
}

export default Dashboard
