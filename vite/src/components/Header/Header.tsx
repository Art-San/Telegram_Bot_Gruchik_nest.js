import { FC, useEffect, useState } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import { useIsAdmin } from '@/pages/Auth/hooks/useIsAdmin'
// import { useSessionQuery } from '@/pages/Auth/hooks/useSessionQuery'
// import { LogoutButton } from '../CustomButton/LogoutButton'

const Header: FC = () => {
  // const { session } = useSessionQuery()
  // console.log(session)

  // if (!session) return null

  const { user, queryId } = useTelegram()

  // const [user, setUser] = useState()
  const { data, isPending } = useIsAdmin()

  // useEffect(() => {
  //   setUser(data)
  // }, [])

  console.log(data, isPending)
  return (
    <div className="flex flex-col items-center justify-center  px-6 py-4 bg-gray-900 text-white">
      <div className="flex">
        <span className=" text-xs">
          {user?.username || 'null'} -- {user?.id || 'null'}
        </span>
      </div>
      <span className="text-xs">{queryId || 'null'}</span>
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
