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

{
  /* <div className=" flex flex-col justify-center items-center gap-6">
<h3 className=" text-2xl font-bold">Здесь заказы за сегодня</h3>
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">От кого</TableHead>
      <TableHead>Статус</TableHead>
      <TableHead>Вид работ</TableHead>
      <TableHead className="">К-во</TableHead>
      <TableHead className="text-right">Цена</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {orders.map((order) => (
      <TableRow key={order.id}>
        <TableCell className="font-medium">{order.authorName}</TableCell>
        <TableCell>{order.status}</TableCell>
        <TableCell>{order.typeWork}</TableCell>
        <TableCell className="">{order.numExecutors}</TableCell>
        <TableCell className="text-right">{order.hourCost}</TableCell>
      </TableRow>
    ))}
    <TableRow>
      <TableCell className="font-medium">
        {orders[1]?.authorName}
      </TableCell>
      <TableCell>{orders[1]?.status}</TableCell>
      <TableCell>{orders[1]?.typeWork}</TableCell>
      <TableCell className="">{orders[1]?.numExecutors}</TableCell>
      <TableCell className="text-right">{orders[1]?.hourCost}</TableCell>
    </TableRow>
  </TableBody>
</Table>
</div> */
}
