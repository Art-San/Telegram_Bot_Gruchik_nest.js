import AdminHeader from '@/components/Header/AdminHeader'

import { Outlet } from 'react-router-dom'

const ProtectedLayout = () => {
  return (
    <div className="">
      <AdminHeader />
      <Outlet />
    </div>
  )
}

export default ProtectedLayout
