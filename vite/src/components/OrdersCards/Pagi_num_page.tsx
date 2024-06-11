import { useEffect, useState } from 'react'
import { OrderService } from '../../services/order/order.service'
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
import { useLocation, useNavigate } from 'react-router-dom'
import { transformDate } from '@/utils/dateUtils'

function getPaginationParamsFromUrl() {
  const urlParams = new URLSearchParams(window.location.search)
  const page = urlParams.get('page') || '1'
  const pageSize = urlParams.get('pageSize') || '3'
  return { page, pageSize }
}

const OrdersCards_2 = () => {
  const [orders, setOrders] = useState<IOrder[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)
  const location = useLocation()
  const navigate = useNavigate()
  const { page, pageSize } = getPaginationParamsFromUrl()

  useEffect(() => {
    const fetchData = async () => {
      const { data, totalPages } = await OrderService.getOrdersPag(
        page,
        pageSize
      )
      setOrders(data)
      setTotalPages(totalPages)
    }

    fetchData()
  }, [page, pageSize])

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(location.search)
    params.set('page', String(newPage))
    params.set('pageSize', pageSize)
    navigate({ search: params.toString() })
  }

  // const date = transformDate(orders[0]?.createdAt)
  // console.log(12, date)
  return (
    <>
      {orders &&
        orders.map((el) => (
          <div className="flex flex-col" key={el.id}>
            <h1 className="text-xl">{el.authorName}</h1>
            <p>{transformDate(el?.createdAt)}</p>
          </div>
        ))}
      <Pagination>
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

export default OrdersCards_2

// {
// 	"orders": [
// 		{
// 			"id": 9,
// 			"authorId": "721836748",
// 			"authorName": "@gruzz70tomsk",
// 			"startTime": "15:00",
// 			"typeWork": "construction",
// 			"numExecutors": 2,
// 			"address": "Лебедева ",
// 			"text": "Мусор на камаз",
// 			"hourCost": 550,
// 			"hourCount": 1,
// 			"createdAt": "2024-06-03T11:06:12.603Z",
// 			"updatedAt": "2024-06-03T11:06:12.603Z",
// 			"status": "created"
// 		},
// 	],
// 	"totalPages": 2
// }
