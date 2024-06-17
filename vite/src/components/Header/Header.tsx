import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserContext } from '@/context/UserContextProvider'
// import { useUserContext } from '@/context/useUser'

const Header = () => {
  // const { currentUser } = useUserContext()
  const { currentUser } = useUserContext()

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
        <a
          href="/orders"
          className="text-gray-400 hover:text-white focus:text-white"
        >
          Заказы
        </a>
        <a
          href="/add_order"
          className="text-gray-400 hover:text-white focus:text-white"
        >
          Добавить заказ
        </a>
        <a
          href="/test"
          className="text-gray-400 hover:text-white focus:text-white"
        >
          Test
        </a>
        <a
          href="/test_2"
          className="text-gray-400 hover:text-white focus:text-white"
        >
          Form s/ui
        </a>
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

export default Header
