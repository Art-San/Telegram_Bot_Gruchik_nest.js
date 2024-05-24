import FormSitePage from '@/components/Form/FormSitePage'
import { FC } from 'react'

const AddOrderSitePage: FC = () => {
  return (
    <div className=" flex flex-col items-center">
      <h3>Введите детали заказа</h3>
      <h4 className=" text-red-500">FormSitePage</h4>
      <FormSitePage />
    </div>
  )
}

export default AddOrderSitePage
