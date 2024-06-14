import { Outlet } from 'react-router-dom'

const AnonymousLayout = () => {
  return (
    <>
      <div className="">
        <h3>Header для логина</h3>
        <Outlet />
      </div>
    </>
  )
}

export default AnonymousLayout
