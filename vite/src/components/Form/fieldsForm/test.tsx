import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { OrderService } from '@/services/order/order.service'
import { IOrder, IPaginationResult } from '@/shared/types/order.types'

const isAuth = true

export function useOrdersPag(page: string, pageSize: string, days?: string) {
  const { data, isLoading, isError } = useQuery<IPaginationResult<IOrder>>({
    queryKey: ['orders', page, pageSize, days],
    queryFn: () => OrderService.getOrdersPag(page, pageSize, days),
    enabled: isAuth
  })

  const [orders, setOrders] = useState<IOrder[] | undefined>(data?.data)
  const [totalPages, setTotalPages] = useState<number>(data?.totalPages || 0)

  useEffect(() => {
    setOrders(data?.data)
    setTotalPages(data?.totalPages || 0)
  }, [data])

  return { orders, isLoading, isError, total: totalPages }
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useOrdersPag } from '@/pages/Orders/hooks/useOrdersPag'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function getDaysParamsFromUrl() {
  const urlParams = new URLSearchParams(window.location.search)
  const days = urlParams.get('days') || 'today'
  return { days }
}

const SelectDays = () => {
  const navigate = useNavigate()
  const { days } = getDaysParamsFromUrl()
  const [day, setDay] = useState(days)

  const { orders } = useOrdersPag('1', '2', days)
  console.log(123, orders)

  const handleChange = (str: string) => {
    setDay(str)
    const params = new URLSearchParams(location.search)
    params.set('days', str)

    navigate({ search: params.toString() })
    console.log(str)
  }

  return (
    <>
      <Select onValueChange={handleChange}>
        <SelectTrigger className="focus:ring-2 focus:ring-inset focus:ring-indigo-100">
          <SelectValue placeholder={day} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Сегодня</SelectItem>
          <SelectItem value="yesterday">Вчера</SelectItem>
          <SelectItem value="last7Days">Последние 7 дней</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}

export default SelectDays
