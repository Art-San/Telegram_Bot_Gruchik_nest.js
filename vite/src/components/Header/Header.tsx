import { FC } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
// import { useSessionQuery } from '@/pages/Auth/hooks/useSessionQuery'
// import { LogoutButton } from '../CustomButton/LogoutButton'

const Header: FC = () => {
  // const { session } = useSessionQuery()
  // console.log(session)

  // if (!session) return null

  const { user } = useTelegram()
  return (
    <div className="flex items-center justify-center  px-6 py-4 bg-gray-900 text-white">
      <span className="text-3xl font-semibold">{user?.username}</span>
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
