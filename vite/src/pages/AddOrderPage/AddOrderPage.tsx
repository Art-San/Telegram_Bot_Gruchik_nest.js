import Form from '@/components/Form/Form'
import { FC } from 'react'

const AddOrderPage: FC = () => {
  return (
    <div className=" flex flex-col items-center">
      <h3>Введите детали заказа</h3>
      <Form />
    </div>
  )
}

export default AddOrderPage
