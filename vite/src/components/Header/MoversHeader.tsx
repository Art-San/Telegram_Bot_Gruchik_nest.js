import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserStore } from '@/zustand/useUserStore'
import { BookA, CircleUserRound, History } from 'lucide-react'
import { Link } from 'react-router-dom'

const PublicHeader = () => {
  const currentUser = useUserStore((state) => state.currentUser)

  return (
    <header className="w-full h-16 bg-slate-100 shadow-md flex justify-center items-center gap-4 px-4">
      <div className="flex items-center justify-center space-x-4">
        <Link to="/orders" className="flex flex-col items-center text-gray-900">
          <BookA />
          <p className="text-xs">Заказы</p>
        </Link>
        <Link
          to="/history"
          className="flex flex-col items-center text-gray-900"
        >
          <History />
          <p className="text-xs">История</p>
        </Link>
        <Link
          to="/profile"
          className="flex flex-col items-center text-gray-900"
        >
          <CircleUserRound />
          <p className="text-xs">Профиль</p>
        </Link>
      </div>
      <div className=" flex flex-col item-start">
        <Avatar>
          <AvatarImage
            src={
              currentUser?.userAvatar ? currentUser.userAvatar : 'avatar.png'
            }
          />
          <AvatarFallback>
            <CircleUserRound />
          </AvatarFallback>
        </Avatar>

        {/* <img
          src={currentUser?.userAvatar || 'path/to/default/avatar.png'}
          alt="User Avatar"
          className="h-10 w-10 rounded-full"
        /> */}
        {/* <span className=" text-xs">{currentUser?.userName || 'null'}</span> */}
      </div>
    </header>
  )
}

export default PublicHeader
