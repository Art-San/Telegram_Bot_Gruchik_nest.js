import { FC } from 'react'
import TableOrdersPag from '@/components/Table/TableOrdersPag'
import ListOrdersForAdmin from '@/components/List/ListOrdersForAdmin'

const OrdersPageAdmin: FC = () => {
  return (
    <>
      <div className=" mt-3 ">
        {/* <TableOrdersPag /> */}
        <ListOrdersForAdmin />
      </div>
    </>
  )
}

export default OrdersPageAdmin
