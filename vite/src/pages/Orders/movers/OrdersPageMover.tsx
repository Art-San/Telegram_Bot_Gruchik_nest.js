import { FC } from 'react'
import TableOrdersForMovers from '@/components/Table/TableOrdersForMovers'
import { Eye } from 'lucide-react'

const OrdersPageMover: FC = () => {
  return (
    <>
      <div className=" flex flex-col justify-center items-center ">
        <TableOrdersForMovers />
      </div>

      <ul className=" bg-slate-50 flex flex-col gap-1  shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-16">
        <li>
          <div className="bg-white px-4 py-2 sm:px-6 border rounded-sm">
            <div className="mt-1 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">№: 45</p>
              <p className="text-sm font-medium text-gray-500">18/06</p>
            </div>
            <div className="flex items-center justify-between">
              <p className=" w-1/6 text-base leading-6 font-medium text-gray-900">
                14:00
              </p>
              <p className="text-base leading-6 font-medium text-gray-900">
                2/2 <span className="text-sm text-gray-400">чел</span>
              </p>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Пианино, сейф такелаж
              </p>
            </div>

            <p className="text-sm font-medium text-gray-400 mt-1">
              Адрес: <span className="text-gray-500">Пушкина 55</span>
            </p>

            <div className="mt-1 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Статус: <span className="text-green-600">Открыто</span>
              </p>
              <a
                href="#"
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                <Eye />
              </a>
            </div>
          </div>
        </li>
        <li>
          <div className="bg-white px-4 py-2 sm:px-6 border rounded-sm">
            <div className="mt-1 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">№: 45</p>
              <p className="text-sm font-medium text-gray-500">18/06</p>
            </div>
            <div className="flex items-center justify-between">
              <p className=" w-1/6 text-base leading-6 font-medium text-gray-900">
                15:00
              </p>
              <p className="text-base leading-6 font-medium text-gray-900">
                2/2 <span className="text-sm text-gray-400">чел</span>
              </p>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Сторой-мат, мусор
              </p>
            </div>
            <div className=" mt-2">
              <p className="text-sm font-medium text-gray-400">
                Адрес: <span className="text-gray-500">Пушкина 55</span>
              </p>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Статус: <span className="text-yellow-600">Закрыто</span>
              </p>
              <a
                href="#"
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                <Eye />
              </a>
            </div>
          </div>
        </li>
        <li>
          <div className=" bg-white px-4 py-2 sm:px-6 border rounded-sm">
            <div className="mt-1 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">№: 45</p>
              <p className="text-sm font-medium text-gray-500">18/06</p>
            </div>
            <div className="flex items-center justify-between">
              <p className=" w-1/6 text-base leading-6 font-medium text-gray-900">
                15:00
              </p>
              <p className="text-base leading-6 font-medium text-gray-900">
                2/2 <span className="text-sm text-gray-400">чел</span>
              </p>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Сторой-мат, мусор
              </p>
            </div>
            <div className=" mt-2">
              <p className="text-sm font-medium text-gray-400">
                Адрес: <span className="text-gray-500">Пушкина 55</span>
              </p>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Статус: <span className="text-green-600">Открыто</span>
              </p>
              <a
                href="#"
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                <Eye />
              </a>
            </div>
          </div>
        </li>
        <li className="border-t border-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                15:00
              </h3>
              <p className="text-lg leading-6 font-medium text-gray-900">
                2/2 <span className="text-sm text-gray-400">чел</span>
              </p>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 truncate">
                Сторой-мат, мусор
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Статус: <span className="text-red-600">Inactive</span>
              </p>
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Edit
              </a>
            </div>
          </div>
        </li>
        <li className="border-t border-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-lg leading-6 font-medium text-gray-900">
                15:00
              </p>
              <p className="text-lg leading-6 font-medium text-gray-900">
                2 <span className="text-sm">чел</span>
              </p>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Переезд, вещи и мебель
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-400">
                Адрес: <span className="text-gray-500">Пушкина 55</span>
              </p>
              <p className="text-sm font-medium text-gray-400">
                Статус: <span className="text-yellow-600">Closed</span>
              </p>
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Edit
              </a>
            </div>
          </div>
        </li>
        <li className="border-t border-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-lg leading-6 font-medium text-gray-900">
                15:00
              </p>
              <p className="text-lg leading-6 font-medium text-gray-900">
                2/1 <span className="text-sm">чел</span>
              </p>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Сторой-мат, мусор
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-400">
                Адрес: <span className="text-gray-500">Пушкина 55</span>
              </p>
              <p className="text-sm font-medium text-gray-400">
                Статус: <span className="text-green-600">Active</span>
              </p>
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Edit
              </a>
            </div>
          </div>
        </li>
        <li className="border-t border-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-lg leading-6 font-medium text-gray-900">
                15:00
              </p>
              <p className="text-lg leading-6 font-medium text-gray-900">
                2/2 <span className="text-sm text-gray-400">чел</span>
              </p>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Сторой-мат, мусор
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-400">
                Адрес: <span className="text-gray-500">Пушкина 55</span>
              </p>
              <p className="text-sm font-medium text-gray-400">
                Статус: <span className="text-yellow-600">Closed</span>
              </p>
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Edit
              </a>
            </div>
          </div>
        </li>
      </ul>
    </>
  )
}

export default OrdersPageMover

// https://tailwindflex.com/@odessa-young/stacked-list
