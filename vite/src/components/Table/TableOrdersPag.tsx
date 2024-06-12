import { Link } from 'react-router-dom'
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
import { View, Trash } from 'lucide-react'
import { getOrderUrl } from '@/configs/api.config'
import { validIconStatus, validIconTypeWork } from '@/utils/icons/iconUtils'
import { Button } from '@/components/ui/button'
import { useDeleteOrder } from '@/pages/Orders/hooks/useDeleteOrder'
import { useOrdersPag } from '@/pages/Orders/hooks/useOrdersPag'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { transformDate } from '@/utils/dateUtils'
import SelectDay from '../Form/fieldsForm/SelectDay'

function getPaginationParamsFromUrl() {
  const urlParams = new URLSearchParams(window.location.search)
  const page = urlParams.get('page') || '1'
  const pageSize = urlParams.get('pageSize') || '2'
  const days = urlParams.get('days') || 'today'
  return { page, pageSize, days }
}

const TableOrdersPag = () => {
  const { page, pageSize, days } = getPaginationParamsFromUrl()
  const [totalPages, setTotalPages] = useState<number>(1)
  const [day, setDay] = useState(days)
  const location = useLocation()
  const navigate = useNavigate()

  const { deleteOrder, isDeletePending } = useDeleteOrder()
  const { orders, isLoading, isError, total } = useOrdersPag(
    page,
    pageSize,
    days
  )

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
      <SelectDay setDay={setDay} day={day} />
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>№</TableHead>
            <TableHead>Тип</TableHead>
            <TableHead>Статус </TableHead>
            <TableHead>Дейст</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders &&
            orders.map((order) => (
              <TableRow
                key={order?.id}
                className="hover:bg-slate-200 hover:text-gray-600"
              >
                <TableCell className="font-medium flex flex-col items-center">
                  <p>{order?.id}</p>
                  <p>{transformDate(order?.createdAt)}</p>
                </TableCell>
                <TableCell>{validIconTypeWork(order?.typeWork)}</TableCell>
                <TableCell className=" flex flex-col items-center ">
                  {validIconStatus(order?.status)}{' '}
                  <p>{`${order?.numExecutors} / ${order.executorsCount}`}</p>
                </TableCell>
                <TableCell className="">
                  <div className="flex flex-col items-center">
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
                  </div>
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
