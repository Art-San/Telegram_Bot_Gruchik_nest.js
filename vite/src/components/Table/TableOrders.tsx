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
import { PersonStanding, View, Trash } from 'lucide-react'
// import { IOrder } from '@/shared/types/order.types'
import { getOrderUrl } from '@/configs/api.config'
import { validIconStatus, validIconTypeWork } from '@/utils/icons/iconUtils'
import { Button } from '@/components/ui/button'
import { useDeleteOrder } from '@/pages/Orders/hooks/useDeleteOrder'
import { useOrders } from '@/pages/Orders/hooks/useOrders'

// interface ITableOrdersProps {
//   orders: IOrder[]
// }

// const TableOrders: React.FC<ITableOrdersProps> = ({ orders }) => {
const TableOrders = () => {
  const { orders, isLoading, isError } = useOrders()
  const { deleteOrder, isDeletePending } = useDeleteOrder()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading orders</p>
  return (
    <>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[]">№</TableHead>
            <TableHead>Тип</TableHead>
            <TableHead>Статус</TableHead>
            {/* <TableHead className="text-right">Цена/ч</TableHead> */}
            <TableHead className="text-right">
              <PersonStanding />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {orders &&
            orders.map((order) => (
              <TableRow
                key={order?.id}
                className=" hover:bg-slate-200 hover:text-gray-600"
              >
                <TableCell className="font-medium">{order?.id}</TableCell>
                <TableCell>{validIconTypeWork(order?.typeWork)}</TableCell>
                <TableCell>{validIconStatus(order?.status)}</TableCell>
                <TableCell className="">{`${order?.numExecutors} / ${order?.executors} `}</TableCell>
                <TableCell className="font-medium">
                  <Link to={getOrderUrl(`/${order.id}`)}>
                    <View className=" text-blue-400" />
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant={'custom'}
                    size={'icon'}
                    onClick={() => deleteOrder(order.id)}
                    disabled={isDeletePending}
                  >
                    <Trash size={15} />
                  </Button>
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
