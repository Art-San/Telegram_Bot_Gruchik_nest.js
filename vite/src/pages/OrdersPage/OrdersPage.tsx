import { FC, useEffect, useState } from 'react'
import { OrderService } from '../../services/order.service'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

interface IOrder {
  id: number
  authorId: string
  authorName: string
  startTime: string
  typeWork: string
  numExecutors: number
  address: string
  text: string
  hourCost: number
  potentialExecutors: string[]
  hourCount: number
  status: string
}

const OrdersPage: FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await OrderService.getAll()
      setOrders(data) // Предполагается, что сервер возвращает строку 'hello world'
    }

    fetchData()
  }, [])

  console.log('orders', orders[1])
  console.log('orders', orders[1]?.authorName)
  console.log('orders', orders[1]?.status)
  console.log('orders', orders[1]?.typeWork)
  console.log('orders', orders[1]?.numExecutors)
  return (
    // ==========
    // <div className="flex flex-col justify-center items-center gap-6">
    //   <h3 className="text-2xl font-bold">Здесь заказы за сегодня</h3>
    //   <div className="w-full overflow-auto">
    //     <div className="flex flex-col">
    //       <div className="w-[100px]">От кого</div>
    //       <div>Статус</div>
    //       <div>Вид работ</div>
    //       <div>К-во</div>
    //       <div className="text-right">Цена</div>
    //     </div>
    //     {orders.map((order) => (
    //       <div key={order.id} className="flex flex-col">
    //         <div className="font-medium">{order.authorName}</div>
    //         <div>{order.status}</div>
    //         <div>{order.typeWork}</div>
    //         <div>{order.numExecutors}</div>
    //         <div className="text-right">{order.hourCost}</div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    //======
    <div className=" flex flex-col justify-center items-center gap-6">
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
          {}
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
    </div>
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
