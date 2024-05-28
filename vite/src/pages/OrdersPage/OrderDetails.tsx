import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

const OrderDetails: FC = () => {
  const { orderId } = useParams()
  // const params = useParams()
  // const { userId, edit } = params

  console.log(12, 'orderId', orderId)
  return (
    <div>
      <div className=""></div>
    </div>
  )
}

export default OrderDetails
