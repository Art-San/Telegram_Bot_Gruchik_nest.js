import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserStore } from '@/zustand/useUserStore'
import { BookA, CircleUserRound, History } from 'lucide-react'
import { Link } from 'react-router-dom'

const PublicHeader = () => {
  const currentUser = useUserStore((state) => state.currentUser)
  const profilePath = `${currentUser?.id}/profile`

  return (
    <header className="w-full h-16 bg-slate-100 shadow-md flex justify-center items-center gap-4 px-4">
      <nav className="flex items-center justify-center space-x-4">
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
          to={profilePath}
          // to="/profile"
          className="flex flex-col items-center text-gray-900"
        >
          <CircleUserRound />
          <p className="text-xs">Профиль</p>
        </Link>
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
      {/* <div className=" flex flex-col item-start">
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
      </div> */}
    </header>
  )
}

export default PublicHeader
