import { FC } from 'react'

const Footer: FC = () => {
  return (
    <div className="flex items-center justify-center gap-5 px-6 py-4 bg-gray-900 text-white">
      <a href="/" className="text-gray-400 hover:text-white focus:text-white">
        Помощь
      </a>
      <a href="/" className="text-gray-400 hover:text-white focus:text-white">
        О нас
      </a>
      <a href="/" className="text-gray-400 hover:text-white focus:text-white">
        Контакты
      </a>
    </div>
  )
}

export default Footer
