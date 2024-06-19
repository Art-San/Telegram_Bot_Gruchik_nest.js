import { FC } from 'react'

const MowerHistory: FC = () => {
  return (
    <div className="px-6  text-wrap">
      {/* <div className=" flex items-center justify-center  w-screen"> */}
      <div>MowerHistory</div>
      <p className=" text-blue-600">
        На этой страницы будет возможен просмотр заказов которые выполнил
        грузчик, за сегодня, за вчера, за последние семь дней. Возможно и более
        длительные периоды: месяц, три месяца, год.
      </p>
    </div>
  )
}

export default MowerHistory
