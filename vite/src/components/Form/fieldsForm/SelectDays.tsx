import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useOrdersPag } from '@/pages/Orders/hooks/useOrdersPag'
import { validDay } from '@/utils/validDays'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function getDaysParamsFromUrl() {
  const urlParams = new URLSearchParams(window.location.search)
  const days = urlParams.get('days') || 'today'
  return { days }
}

// const validType = (type: keyof typeof days) => {
//   const days = {
//     today: 'Сегодня',
//     yesterday: 'Вчера',
//     last7Days: 'Последние 7 дней'
//   }

//   return <div className="flex gap-1">{days[type] || 'х.з'}</div>
// }

const SelectDays = () => {
  const navigate = useNavigate()
  const { days } = getDaysParamsFromUrl()
  const [day, setDay] = useState(days)

  const { orders } = useOrdersPag('1', '10', days)
  console.log(123, orders)

  const handleChange = (str: string) => {
    setDay(str)
    const params = new URLSearchParams(location.search)
    params.set('days', str)

    navigate({ search: params.toString() })
    console.log(str)
  }

  return (
    <>
      <div className=" flex justify-end space-x-4">
        {/* <div className=" flex justify-end items-end space-x-4"> */}
        <Select onValueChange={handleChange}>
          <SelectTrigger className="max-w-fit flex focus:ring-2 focus:ring-inset focus:ring-indigo-100">
            <SelectValue placeholder={validDay(day)} className="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Сегодня</SelectItem>
            <SelectItem value="yesterday">Вчера</SelectItem>
            <SelectItem value="last7Days">Последние 7 дней</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={handleChange}>
          <SelectTrigger className="max-w-fit flex focus:ring-2 focus:ring-inset focus:ring-indigo-100">
            <SelectValue placeholder={day} className="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Сегодня</SelectItem>
            <SelectItem value="yesterday">Вчера</SelectItem>
            <SelectItem value="last7Days">Последние 7 дней</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  )
}

export default SelectDays

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from '@/components/ui/select'

// import { OrderService } from '@/services/order/order.service'

// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { IOrder } from '@/shared/types/order.types'
// function getDaysParamsFromUrl() {
//   const urlParams = new URLSearchParams(window.location.search)
//   const days = urlParams.get('days') || 'today'
//   return { days }
// }

// const SelectDays = () => {
//   const [orders, setOrders] = useState<IOrder[]>([])
//   const navigate = useNavigate()
//   const { days } = getDaysParamsFromUrl()
//   const [day, setDay] = useState(days)

//   useEffect(() => {
//     const fetchData = async () => {
//       const { data } = await OrderService.getOrdersPag('1', '10', days)
//       setOrders(data)
//     }

//     fetchData()
//   }, [days])

//   console.log(5555, orders)

//   const handleChange = (str: string) => {
//     console.log(12345, str)
//     setDay(str)
//     const params = new URLSearchParams(location.search)
//     params.set('days', str)

//     navigate({ search: params.toString() })
//   }

//   return (
//     <>
//       <Select onValueChange={handleChange}>
//         <SelectTrigger className="focus:ring-2 focus:ring-inset focus:ring-indigo-100">
//           <SelectValue placeholder={day} />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="today">Сегодня</SelectItem>
//           <SelectItem value="yesterday">Вчера</SelectItem>
//           <SelectItem value="last7Days">Последние 7 дней</SelectItem>
//         </SelectContent>
//       </Select>
//     </>
//   )
// }

// export default SelectDays
