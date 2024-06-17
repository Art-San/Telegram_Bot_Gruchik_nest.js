import { FC } from 'react'
// import TableOrders from '@/components/Table/TableOrders'
import TableOrdersForMovers from '@/components/Table/TableOrdersForMovers'
// import { useSessionQuery } from '@/pages/Auth/hooks/useSessionQuery'

const OrdersPageMovers: FC = () => {
  // const { session, isLoading, isError } = useSessionQuery()
  // console.log('session', session)

  // const { orders, isLoading, isError } = useOrders() // перенес в  таблицу
  // const [orders, setOrders] = useState<IOrder[]>([])
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await OrderService.getAllOrders()
  //     setOrders(data)
  //   }

  //   fetchData()
  // }, [])

  // if (isLoading) return <p>Loading...</p>
  // if (isError) return <p>Error loading orders</p>

  return (
    <>
      <div className=" flex flex-col justify-center items-center ">
        <TableOrdersForMovers />
      </div>
    </>
  )
}

export default OrdersPageMovers
