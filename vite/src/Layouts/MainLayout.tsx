import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="">
      <h3>Header для залогиненных пользователей</h3>
      <Outlet />
    </div>
  )
}

export default MainLayout
