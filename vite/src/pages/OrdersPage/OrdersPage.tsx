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
  numExecutors: number
  address: string
  text: string
  hourCost: number
  potentialExecutors: string[]
  hourCount: number
  status: string
}

const OrdersPage: FC = () => {
  const [message, setMessage] = useState<IOrder[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await OrderService.getAll()
      setMessage(data) // Предполагается, что сервер возвращает строку 'hello world'
    }

    fetchData()
  }, [])

  console.log('message', message[0])
  console.log('message', message[0]?.authorName)
  console.log('message', message[0]?.authorName)
  console.log('message', message[0]?.authorName)
  return (
    <div className=" flex flex-col justify-center items-center gap-6">
      <h3 className=" text-2xl font-bold">Здесь заказы за сегодня</h3>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default OrdersPage
