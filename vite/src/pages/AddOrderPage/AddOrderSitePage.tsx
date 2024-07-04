import BackButton from '@/components/Buttons/BackButton'
import { OrderForm } from '@/components/Form/OrderForm'
import { Spinner } from '@/components/ui/spinner'
import { useUserStore } from '@/zustand/useUserStore'
import { FC } from 'react'

const AddOrderSitePage: FC = () => {
  const currentUser = useUserStore((state) => state.currentUser)

  if (!currentUser) {
    return (
      <>
        <div>Loading...</div>
        <Spinner
          className="mr-2 h-8 w-8 animate-spin"
          aria-label="Загрузка профиля"
        />
      </>
    )
  }

  return (
    <div className=" flex flex-col items-center ">
      <div className=" flex  w-1/3 justify-between ">
        <BackButton />
        <h4 className=" text-red-500">FormSitePage</h4>
      </div>
      <h3 className="">Введите детали заказа</h3>
      <OrderForm
        telegramId={currentUser?.telegramId}
        authorName={currentUser?.userName}
      />
    </div>
  )
}

export default AddOrderSitePage
