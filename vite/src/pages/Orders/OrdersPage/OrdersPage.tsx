import { FC, useEffect, useState } from 'react'
import { OrderService } from '../../../services/order.service'
import TableOrders from '@/components/Table/TableOrders'
import { IOrder } from '@/shared/types/order.types'

const OrdersPage: FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await OrderService.getAll()
      setOrders(data)
    }

    fetchData()
  }, [])

  return (
    <>
      <div className=" flex flex-col justify-center items-center gap-6">
        <TableOrders orders={orders} />
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex justify-between gap-1">
          <div className="self-start text-lg">3 / 2</div>
        </div>
      </div>
    </>
  )
}

export default OrdersPage
