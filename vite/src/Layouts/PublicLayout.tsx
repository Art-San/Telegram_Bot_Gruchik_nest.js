import PublicFooter from '@/components/Footer/PublicFooter'
import PublicHeader from '@/components/Header/PublicHeader'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1 overflow-y-scroll">
        <h3 className=" text-center text-orange-300">Header для Грузчиков</h3>
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  )
}

export default PublicLayout

// import { Outlet } from 'react-router-dom'

// const PublicLayout = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <header className="w-full h-16 bg-slate-100 shadow-md flex justify-center items-center gap-4 px-4">
//         <div className="flex space-x-4">
//           <span className="text-gray-900 hover:text-white focus:text-white">
//             Заказы
//           </span>
//           <span className="text-gray-900 hover:text-white focus:text-white">
//             Профиль
//           </span>
//         </div>
//       </header>
//       <main className="flex-1 overflow-y-scroll">
//         <Outlet />
//       </main>
//       <footer className="w-full h-16 bg-slate-100 flex justify-center items-center gap-4 px-4">
//         <a href="/" className="text-gray-900 hover:text-white focus:text-white">
//           Помощь
//         </a>
//         <a href="/" className="text-gray-900 hover:text-white focus:text-white">
//           О нас
//         </a>
//         <a href="/" className="text-gray-900 hover:text-white focus:text-white">
//           Контакты
//         </a>
//       </footer>
//     </div>
//   )
// }

// export default PublicLayout
