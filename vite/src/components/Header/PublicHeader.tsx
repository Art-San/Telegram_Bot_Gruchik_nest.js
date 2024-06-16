import { useTelegram } from '@/hooks/useTelegram'
import React from 'react'

const PublicHeader: React.FC = () => {
  const { user, queryId } = useTelegram()
  return (
    <header className="w-screen h-16 bg-white shadow-md flex justify-center items-center gap-2 px-4">
      {/* <header className="w-screen h-16 bg-white shadow-md flex justify-between items-center px-4"> */}
      <div className="flex space-x-4">
        <span>Заказы</span>
        <span>Профиль</span>
        <span>{user?.id}</span>
      </div>
      <img
        src="avatar.png"
        alt="Аватар пользователя"
        className="h-10 w-10 rounded-full"
      />
    </header>
  )
}

export default PublicHeader
