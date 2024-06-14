import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <div className="">
      <h3>Header для PublicLayout</h3>
      <Outlet />
    </div>
  )
}

export default PublicLayout
