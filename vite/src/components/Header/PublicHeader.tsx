import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserContext } from '@/context/useUser'

const PublicHeader = () => {
  const { currentUser } = useUserContext()
  console.log(12, 'PublicHeader', currentUser?.userAvatar)
  return (
    <header className="w-screen h-16 bg-white shadow-md flex justify-center items-center gap-4 px-4">
      {/* <header className="w-screen h-16 bg-white shadow-md flex justify-between items-center px-4"> */}
      <div className="flex space-x-4">
        <span>Заказы</span>
        <span>Профиль</span>
      </div>
      <div className=" flex flex-col item-start">
        <Avatar>
          <AvatarImage
            src={
              currentUser?.userAvatar ? currentUser.userAvatar : 'avatar.png'
            }
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className=" text-xs">{currentUser?.userName || 'null'}</span>
      </div>
    </header>
  )
}

export default PublicHeader
