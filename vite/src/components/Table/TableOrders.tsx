import { Link } from 'react-router-dom'
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
  CircleHelp,
  View
} from 'lucide-react'
import { IOrder } from '@/shared/types/order.types'
import { getOrderUrl } from '@/configs/api.config'

interface ITableOrdersProps {
  orders: IOrder[]
}

const TableOrders: React.FC<ITableOrdersProps> = ({ orders }) => {
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
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[]">№</TableHead>
            <TableHead>Тип</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-right">Цена/ч</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {orders &&
            orders.map((order) => (
              <TableRow
                key={order.id}
                className=" hover:bg-slate-200 hover:text-gray-600"
              >
                <TableCell className="font-medium">{order?.id}</TableCell>
                <TableCell>{validIcon(order?.typeWork)}</TableCell>
                <TableCell>{order?.status}</TableCell>
                <TableCell className="text-right">{order?.hourCost}</TableCell>
                {/* <Link to={`/orders/${order.id}`}> */}
                <TableCell className="font-medium">
                  <Link to={getOrderUrl(`/${order.id}`)}>
                    <View className=" text-blue-400" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableCaption>A list of your recent invoices.</TableCaption>
      </Table>
    </>
  )
}

export default TableOrders
