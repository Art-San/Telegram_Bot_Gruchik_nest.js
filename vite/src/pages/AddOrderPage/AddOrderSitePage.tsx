// import FormSitePage from '@/components/Form/FormSitePage'
import { OrderForm } from '@/components/Form/OrderForm'
import SelectDays from '@/components/Form/fieldsForm/SelectDays'
// import SelectField from '@/components/Form/fieldsForm/SelectField'
// import { SelectForm } from '@/components/Form/fieldsForm/SelectForm'
import { FC } from 'react'

const AddOrderSitePage: FC = () => {
  return (
    <div className=" flex flex-col items-center ">
      <div className=" flex flex-col min-w-[100%] items-center ">
        <h3 className="">Введите детали заказа</h3>
        <h4 className=" text-red-500">FormSitePage</h4>
      </div>
      <div className="flex flex-col gap-10">
        <SelectDays />
        {/* <FormSitePage /> */}
        {/* <SelectField /> */}
        {/* <SelectForm /> */}
        <OrderForm />
      </div>
    </div>
  )
}

export default AddOrderSitePage
