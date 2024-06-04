import { FC } from 'react'
import TableOrders from '@/components/Table/TableOrders'
import { useSessionQuery } from '@/pages/Auth/hooks/useSessionQuery'

const OrdersPage: FC = () => {
  const { session, isLoading, isError } = useSessionQuery()
  console.log('session', session)
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
      <div className=" flex flex-col justify-center items-center gap-6">
        {<TableOrders />}
        {/* {orders && <TableOrders orders={orders} />} */}
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between gap-1">
          <div className="self-start text-lg">3 / 2</div>
        </div>
      </div>
    </>
  )
}

export default OrdersPage
