import PublicHeader from '@/components/Header/PublicHeader'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <div className="">
      <PublicHeader />
      {/* <h3>Header для Грузчиков</h3> */}
      <Outlet />
    </div>
  )
}

export default PublicLayout
