import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserStore } from '@/zustand/useUserStore'
import { BookA, Users } from 'lucide-react'

import { Link } from 'react-router-dom'
// import { useUserContext } from '@/context/useUser'

const AdminHeader = () => {
  const currentUser = useUserStore((state) => state.currentUser)

  console.log(12, 'PublicHeader', currentUser?.userAvatar)

  return (
    <header className="w-full h-16 bg-slate-100 shadow-md flex justify-center items-center gap-4 px-4">
      {/* <header className="flex flex-col items-center justify-center  px-6 py-4 bg-gray-900 text-white"> */}
      <nav className="flex items-center justify-center space-x-4">
        <Link
          to="/admin/orders"
          className="flex flex-col items-center text-gray-900"
        >
          <BookA />
          <p className="text-xs">Заказы</p>
        </Link>
        <Link
          to="/admin/users"
          className="flex flex-col items-center text-gray-900"
        >
          <Users />
          <p className="text-xs">Грузчики</p>
        </Link>
        <Link to="/test" className="flex flex-col items-center text-gray-900">
          Test
        </Link>
        {/* <Link
          to="/test_2"
          className="flex flex-col items-center text-gray-900"
        >
          Form s/ui
        </Link> */}
      </nav>
      {currentUser && (
        <div className=" flex gap-2">
          <Avatar>
            <AvatarImage
              src={
                currentUser?.userAvatar
                  ? currentUser.userAvatar
                  : 'https://github.com/shadcn.png'
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className=" flex flex-col">
            <p className=" text-xs">{currentUser?.userName || 'null'}</p>
            <p className=" text-xs">{currentUser?.telegramId || 'null'}</p>
          </div>
        </div>
      )}
    </header>
  )
}

export default AdminHeader
