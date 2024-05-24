import { FC } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
const Header: FC = () => {
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
          Test_2
        </a>
        {/* <Button
          onClick={onClose}
          className="bg-transparent border-none text-white hover:text-gray-400 focus:text-gray-400"
        >
          Закрыть
        </Button> */}
      </nav>
    </div>
  )
}

export default Header
