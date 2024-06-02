// import FormSitePage from '@/components/Form/FormSitePage'
import { OrderForm } from '@/components/Form/OrderForm'
// import { SelectForm } from '@/components/Form/fieldsForm/SelectForm'
import { FC } from 'react'

const AddOrderSitePage: FC = () => {
  return (
    <div className=" flex flex-col items-center ">
      <div className=" flex flex-col min-w-[100%] items-center ">
        <h3 className="">Введите детали заказа</h3>
        <h4 className=" text-red-500">FormSitePage</h4>
      </div>
      {/* <FormSitePage /> */}
      {/* <SelectForm /> */}
      <OrderForm />
    </div>
  )
}

export default AddOrderSitePage
