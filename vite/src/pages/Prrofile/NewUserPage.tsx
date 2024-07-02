import { Separator } from '@/components/ui/separator'
import { useUserStore } from '@/zustand/useUserStore'
import { Spinner } from '@/components/ui/spinner'
import CreatedProfile from './CreatedProfilePage'

const NewUserPage = () => {
  const currentUser = useUserStore((state) => state.currentUser)
  console.log(123, currentUser)

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
    <main className=" flex flex-col items-center">
      <div className=" flex gap-1">
        <p>{currentUser?.userName}</p>
        <p>{currentUser?.id}</p>
        <p>{currentUser?.telegramId}</p>
      </div>
      {!currentUser.profileFilled ? (
        <div className=" flex flex-col items-center">
          <h3 className="text-lg font-medium">Важный шаг</h3>
          <p className="text-sm text-muted-foreground text-red-400">
            Чтобы продолжить работу с ботом нужно заполнить профиль
          </p>

          <Separator />
          <CreatedProfile userId={currentUser.id} />
        </div>
      ) : (
        <div className="px-6 text-wrap">
          <p>
            Ваш профиль уже заполнен, вы можете его редактировать в
            соответствующем разделе.
          </p>
        </div>
      )}
    </main>
  )
}

export default NewUserPage
