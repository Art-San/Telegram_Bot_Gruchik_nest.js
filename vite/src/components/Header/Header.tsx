import { FC, useEffect, useState } from 'react'
import { useTelegram } from '../../hooks/useTelegram'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUser } from '@/pages/Auth/hooks/useUser'
// import { useSessionQuery } from '@/pages/Auth/hooks/useSessionQuery'
// import { LogoutButton } from '../CustomButton/LogoutButton'

const Header: FC = () => {
  // const { session } = useSessionQuery()
  // console.log(session)

  // if (!session) return null

  // const { user, queryId } = useTelegram()

  // const [user, setUser] = useState()
  const { data, isPending } = useUser('721836748')

  // useEffect(() => {
  //   setUser(data)
  // }, [])

  // const { userAvatar } = data
  console.log(data)
  console.log(isPending)
  return (
    <div className="flex flex-col items-center justify-center  px-6 py-4 bg-gray-900 text-white">
      <div className=" flex gap-2">
        <Avatar>
          <AvatarImage
            src={
              data?.userAvatar
                ? data.userAvatar
                : 'https://github.com/shadcn.png'
            }
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className=" flex flex-col">
          <p className=" text-xs">{data?.userName || 'null'}</p>
          <p className=" text-xs">{data?.telegramId || 'null'}</p>
        </div>
      </div>
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
            <p>{session?.data.userName}</p>
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
