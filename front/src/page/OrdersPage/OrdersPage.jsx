import { useEffect, useState } from 'react'
import { OrderService } from '../../services/order.service'

const OrdersPage = () => {
  const [message, setMessage] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await OrderService.getAll()
      setMessage(data) // Предполагается, что сервер возвращает строку 'hello world'
    }

    fetchData()
  }, [])

  // console.log('message', message)
  return (
    <div className=" flex justify-center">
      <h3 className=" text-2xl font-bold">Здесь заказы за сегодня</h3>
    </div>
  )
}
export default OrdersPage
