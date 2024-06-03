import { useEffect, useState } from 'react'
import { OrderService } from '../../services/order.service'
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

import { useLocation } from 'react-router-dom'

function getPaginationParamsFromUrl() {
  const urlParams = new URLSearchParams(window.location.search)
  const page = urlParams.get('page')
  const pageSize = urlParams.get('pageSize')
  return { page, pageSize }
}

const OrdersCards_2 = () => {
  const [orders, setOrders] = useState<IOrder[]>([])
  const location = useLocation()
  const { page, pageSize } = getPaginationParamsFromUrl()

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await OrderService.getAllOrders(String(1), String(10))
      setOrders(data)
    }

    fetchData()
  }, [page, pageSize])

  // useEffect(() => {
  //   const page = 1 // Начальное значение, можно изменить в зависимости от логики
  //   const pageSize = 10 // Количество записей на странице

  //   const fetchData = async () => {
  //     const { data } = await OrderService.getAllOrders(
  //       String(page),
  //       String(pageSize)
  //     )
  //     setOrders(data)
  //   }

  //   fetchData()
  // }, [page, pageSize]) // Зависимость от page и pageSize

  return (
    <>
      {orders &&
        orders.map((el) => (
          <div className=" flex flex-col" key={el.id}>
            <h1 className="  text-xl"> {el.authorName}</h1>
          </div>
        ))}
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

export default OrdersCards_2
