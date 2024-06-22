// import FormSitePage from '@/components/Form/FormSitePage'
import BackButton from '@/components/Buttons/BackButton'
import { OrderForm } from '@/components/Form/OrderForm'
import SelectDays from '@/components/Form/fieldsForm/SelectDays'
// import SelectField from '@/components/Form/fieldsForm/SelectField'
// import { SelectForm } from '@/components/Form/fieldsForm/SelectForm'
import { FC } from 'react'

const AddOrderSitePage: FC = () => {
  return (
    <div className=" flex flex-col items-center ">
      <div className=" flex  w-1/3 justify-between ">
        <BackButton />
        <h4 className=" text-red-500">FormSitePage</h4>
      </div>
      <h3 className="">Введите детали заказа</h3>
      <OrderForm />
    </div>
  )
}

export default AddOrderSitePage
