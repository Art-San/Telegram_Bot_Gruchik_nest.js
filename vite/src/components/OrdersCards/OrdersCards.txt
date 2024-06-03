import { useEffect, useState } from 'react'
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

import {
  Package,
  Sofa,
  Refrigerator,
  Cuboid,
  HardHat,
  Trash2,
  Piano,
  Anvil,
  CircleHelp
} from 'lucide-react'
import { IOrder } from '@/shared/types/order.types'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
const OrdersCards = () => {
  const [orders, setOrders] = useState<IOrder[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await OrderService.getAllOrders()
      setOrders(data)
      console.log(13, data)
    }
    fetchData()
  }, [])

  const validIcon = (type: string) => {
    switch (type) {
      case 'moving':
        return (
          <div className="flex gap-1">
            <Package /> <Sofa /> <Refrigerator />
          </div>
        )
      case 'construction':
        return (
          <div className="flex gap-1">
            <HardHat /> <Cuboid /> <Trash2 />
          </div>
        )
      case 'rigging':
        return (
          <div className="flex gap-1">
            <Piano /> <Anvil />
          </div>
        )
      default:
        return <CircleHelp />
    }
  }

  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[]">№</TableHead>
            <TableHead>Тип</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-right">Цена/ч</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders &&
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order?.id}</TableCell>
                <TableCell>{validIcon(order?.typeWork)}</TableCell>
                {/* <TableCell>{order?.typeWork}</TableCell> */}
                <TableCell>{order?.status}</TableCell>
                <TableCell className="text-right">{order?.hourCost}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}

export default OrdersCards
