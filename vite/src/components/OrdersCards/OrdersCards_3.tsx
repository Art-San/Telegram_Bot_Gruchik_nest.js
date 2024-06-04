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

const OrdersCards_3 = () => {
  const [orders, setOrders] = useState<IOrder[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await OrderService.getAllOrders()
      setOrders(data)
    }

    fetchData()
  }, [])

  return (
    <>
      {orders &&
        orders.map((el) => (
          <div className=" flex flex-col" key={el.id}>
            <h1 className=" text-blue-600 text-xl"> {el.authorName}</h1>
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

// export default OrdersCards_3
