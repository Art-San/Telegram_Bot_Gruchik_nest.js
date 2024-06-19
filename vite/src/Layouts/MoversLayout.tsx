import PublicFooter from '@/components/Footer/PublicFooter'
import MoversHeader from '@/components/Header/MoversHeader'
import { Outlet } from 'react-router-dom'

const MoversLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-10">
        <MoversHeader />
      </div>
      <main className="flex-1 overflow-y-auto ">
        <h3 className=" text-center text-orange-800">Header для Грузчиков</h3>
        {/* <div className=" flex flex-col items-center justify-center "></div> */}

        <Outlet />
      </main>
      <div className="sticky bottom-0 z-10">
        <PublicFooter />
      </div>
    </div>
  )
}

export default MoversLayout
