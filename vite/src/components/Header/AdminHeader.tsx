import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserStore } from '@/zustand/useUserStore'

import { Link } from 'react-router-dom'
// import { useUserContext } from '@/context/useUser'

const AdminHeader = () => {
  const currentUser = useUserStore((state) => state.currentUser)

  console.log(12, 'PublicHeader', currentUser?.userAvatar)

  return (
    <div className="flex flex-col items-center justify-center  px-6 py-4 bg-gray-900 text-white">
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
      <nav className="flex gap-5 space-x-4">
        <Link
          to="/admin/orders"
          className="text-gray-400 hover:text-white focus:text-white"
        >
          Заказы
        </Link>
        <Link
          to="/admin/add_order"
          className="text-gray-400 hover:text-white focus:text-white"
        >
          Добавить заказ
        </Link>
        <Link
          to="/test"
          className="text-gray-400 hover:text-white focus:text-white"
        >
          Test
        </Link>
        <Link
          to="/test_2"
          className="text-gray-400 hover:text-white focus:text-white"
        >
          Form s/ui
        </Link>
        {/* {session && (
          <div className="flex flex-col gap-2 items-center">
            <p>{session?.currentUser.userName}</p>
            <div className=" flex gap-2 items-center">
              <p>Sign Out</p>
              <LogoutButton />
            </div>
          </div>
        )} */}
      </nav>
    </div>
  )
}

export default AdminHeader
