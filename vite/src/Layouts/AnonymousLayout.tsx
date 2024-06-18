import { Outlet } from 'react-router-dom'

const AnonymousLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="sticky top-0 z-10">
          <h3>Header для логина</h3>
        </div>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <div className="sticky bottom-0 z-10">
          <h3>footer для логина</h3>
        </div>
      </div>
    </>
  )
}

export default AnonymousLayout
