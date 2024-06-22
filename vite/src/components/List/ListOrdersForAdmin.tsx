import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

import { useOrdersPag } from '@/pages/Orders/hooks/useOrdersPag'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SelectDay from '../Form/fieldsForm/SelectDay'
import { useOrderStore } from '@/zustand/useOrderStore'
import { Eye } from 'lucide-react'
import { transformDate } from '@/utils/dateUtils'
import { validIconStatus, validIconTypeWork } from '@/utils/icons/iconUtils'
import { getOrderUrlForAdmin } from '@/configs/api.config'
import { Button } from '@/components/ui/button'
import CustomButtonLink from '../Buttons/CustomButton'

function getPaginationParamsFromUrl() {
  const urlParams = new URLSearchParams(window.location.search)
  const page = urlParams.get('page') || '1'
  const pageSize = urlParams.get('pageSize') || '10'
  const days = urlParams.get('days') || 'today'
  return { page, pageSize, days }
}

const ListOrdersForAdmin = () => {
  const { page, pageSize, days } = getPaginationParamsFromUrl()
  const [totalPages, setTotalPages] = useState<number>(1)
  const [day, setDay] = useState(days)
  const location = useLocation()
  const navigate = useNavigate()

  const { isLoading, isError, total } = useOrdersPag(page, pageSize, days)
  const orders = useOrderStore((state) => state.orders)

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
      <div className="">
        <ul className=" bg-slate-50 flex flex-col gap-1  shadow overflow-hidden sm:rounded-md max-w-sm mx-auto ">
          <div className="flex justify-between">
            <SelectDay setDay={setDay} day={day} />
            <Button variant={'link'}>
              <Link to="/admin/add_order">Добавить</Link>
            </Button>
          </div>

          {orders &&
            orders.map((order) => (
              <li key={order.id}>
                <div className="bg-white px-4 py-2 sm:px-6 border rounded-sm">
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500">
                      №: {order?.id}
                    </p>
                    <p className="text-sm font-medium text-gray-500">
                      {transformDate(order?.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className=" w-1/6 text-base leading-6 font-medium text-gray-900">
                      {order?.startTime}
                    </p>
                    <p className="text-base leading-6 font-medium text-gray-900">
                      {`${order?.numExecutors} / ${order.executorsCount}`}{' '}
                      <span className="text-sm text-gray-400">чел</span>
                    </p>
                    <p className="text-base leading-6 font-medium text-gray-900">
                      {order?.hourCost}
                      <span className="text-sm text-gray-400"> руб</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-400 mt-1">
                      Адрес:{' '}
                      <span className="text-gray-500">{order?.address}</span>
                    </p>
                    {validIconTypeWork(order?.typeWork)}
                  </div>

                  <div className="mt-1 flex items-center justify-between">
                    <div className=" flex  items-center gap-2">
                      <p className="text-sm font-medium text-gray-500">
                        Статус:
                      </p>
                      {validIconStatus(order?.status)}
                    </div>
                    <Link to={getOrderUrlForAdmin(`/${order.id}`)}>
                      <Eye
                        size={20}
                        className="text-indigo-400 hover:text-indigo-300"
                      />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
        </ul>

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
            {[...Array(2)].map((_, i) => (
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
      </div>
    </>
  )
}

export default ListOrdersForAdmin
