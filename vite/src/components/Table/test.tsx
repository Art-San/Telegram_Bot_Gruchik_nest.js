import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { PersonStanding, View, Trash } from 'lucide-react'
import { getOrderUrl } from '@/configs/api.config'
import { validIconStatus, validIconTypeWork } from '@/utils/icons/iconUtils'
import { Button } from '@/components/ui/button'
import { useDeleteOrder } from '@/pages/Orders/hooks/useDeleteOrder'
import { OrderService } from '@/services/order/order.service'
import { IOrder, IPaginationResult } from '@/shared/types/order.types'

function getPaginationParamsFromUrl() {
  const urlParams = new URLSearchParams(window.location.search)
  const page = urlParams.get('page') || '1'
  const pageSize = urlParams.get('pageSize') || '2'
  return { page, pageSize }
}

export function useOrdersPag(page: string, pageSize: string) {
  const { data, isLoading, isError } = useQuery<IPaginationResult<IOrder>>({
    queryKey: ['orders', page, pageSize],
    queryFn: () => OrderService.getOrdersPag(page, pageSize)
  })

  const [orders, setOrders] = useState<IOrder[] | undefined>(data?.data)
  const [totalPages, setTotalPages] = useState<number>(data?.totalPages || 0)

  useEffect(() => {
    setOrders(data?.data)
    setTotalPages(data?.totalPages || 0)
  }, [data])

  return { orders, isLoading, isError, total: totalPages }
}

const TableOrdersPag = () => {
  const [totalPages, setTotalPages] = useState<number>(1)
  const location = useLocation()
  const navigate = useNavigate()
  const { page, pageSize } = getPaginationParamsFromUrl()

  const { deleteOrder, isDeletePending } = useDeleteOrder()
  const { orders, isLoading, isError, total } = useOrdersPag(page, pageSize)

  useEffect(() => {
    setTotalPages(total)
  }, [total])

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(location.search)
    params.set('page', String(newPage))
    params.set('pageSize', pageSize)
    navigate({ search: params.toString() })
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading orders</p>

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>№</TableHead>
            <TableHead>Тип</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-right">
              <PersonStanding />
            </TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders &&
            orders.map((order) => (
              <TableRow
                key={order?.id}
                className="hover:bg-slate-200 hover:text-gray-600"
              >
                <TableCell className="font-medium">{order?.id}</TableCell>
                <TableCell>{validIconTypeWork(order?.typeWork)}</TableCell>
                <TableCell>{validIconStatus(order?.status)}</TableCell>
                <TableCell>{`${order?.numExecutors} / ${order.executorsCount}`}</TableCell>
                <TableCell className="flex justify-end space-x-2">
                  <Link to={getOrderUrl(`/${order.id}`)}>
                    <View className="text-blue-400" />
                  </Link>
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
      </Table>
      <Pagination className="flex justify-center mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(Math.max(1, Number(page) - 1))
              }}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(i + 1)
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(Math.min(totalPages, Number(page) + 1))
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}

export default TableOrdersPag
