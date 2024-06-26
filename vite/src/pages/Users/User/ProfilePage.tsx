import BackButton from '@/components/Buttons/BackButton'
import { UpdateProfileForm } from '@/components/Form/fieldsForm/UpdateProfileForm'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/zustand/useUserStore'
import { Separator } from '@radix-ui/react-select'
import { Trash } from 'lucide-react'

import { useNavigate, useParams, redirect } from 'react-router-dom'

const Profile = () => {
  // const { telegramId } = useParams()
  // console.log(123, 'Profile', telegramId)

  const currentUser = useUserStore((state) => state.currentUser)
  // const navigate = useNavigate()
  // const goBack = () => {
  //   navigate(-1)
  // }

  if (!currentUser) {
    // return redirect('/orders')
  }

  console.log(123, currentUser)
  return (
    <main className="space-y-6 py-14 container  max-w-[600px]">
      <div>
        <h3 className="text-lg font-medium">Профиль</h3>
        <p className="text-sm text-muted-foreground">
          Необходима заполнить профиль, тогда будет возможность брать заказы
        </p>
        <p>{currentUser?.userName}</p>
        <p>{currentUser?.id}</p>
      </div>
      <Separator />

      <UpdateProfileForm userId={currentUser.id} />
    </main>
  )
  // return (
  //   <div className="">
  //     <div className=" flex  w-1/3 justify-between">
  //       <BackButton />
  //       <Button variant={'outline'} onClick={goBack}>
  //         <p>Удалить</p> <Trash size={15} />
  //       </Button>
  //     </div>
  //     {/* <div className=" flex items-center justify-center  w-screen"> */}
  //     <p className=" text-blue-600">
  //       Страница профиля с возможность редактирования некоторых полей
  //     </p>
  //   </div>
  // )
}

export default Profile
