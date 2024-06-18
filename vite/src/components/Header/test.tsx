import React from 'react'
import { Link } from 'react-router-dom'
import { BookA, CircleUserRound, History } from 'lucide-react'

const Header: React.FC = () => {
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
    </header>
  )
}

export default Header
