const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="mx-4 flex h-auto w-1/5 border-r border-r-slate-300 p-8">
        <ul>
          <li>filters</li>
          <li>settings</li>
          <li>some other options</li>
        </ul>
      </div>
      <div className="min-h-full w-full bg-blue-300">
        <div className="flex h-auto  border-r border-r-slate-300 bg-purple-500 p-8">
          <ul className="flex flex-grow justify-between">
            <li>My products</li>
            <li>something</li>
            <li>something</li>
            <li>something</li>
            <li>something</li>
          </ul>
        </div>
        <div className="m-1 grid  grid-cols-4 gap-3 rounded-lg border bg-red-400 p-4">
          <div className="h-56 w-64 rounded-lg border bg-slate-400 p-8 shadow-sm">
            ITEM
          </div>
          <div className="h-56 w-64 rounded-lg border p-8 shadow-sm">ITEM</div>
          <div className="h-56 w-64 rounded-lg border p-8 shadow-sm">ITEM</div>
          <div className="h-56 w-64 rounded-lg border p-8 shadow-sm">ITEM</div>
          <div className="h-56 w-64 rounded-lg border p-8 shadow-sm">ITEM</div>
          <div className="h-56 w-64 rounded-lg border p-8 shadow-sm">ITEM</div>
          <div className="h-56 w-64 rounded-lg border p-8 shadow-sm">ITEM</div>
          <div className="h-56 w-64 rounded-lg border p-8 shadow-sm">ITEM</div>
          <div className="h-56 w-64 rounded-lg border p-8 shadow-sm">ITEM</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
