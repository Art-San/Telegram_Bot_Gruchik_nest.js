import { Separator } from '@/components/ui/separator'
import { useUserStore } from '@/zustand/useUserStore'
import { Spinner } from '@/components/ui/spinner'
import CreatedProfile from './CreatedProfilePage'

const NewUserPage = () => {
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
    <main className=" flex flex-col items-center">
      <div>
        <h3 className="text-lg font-medium">Важный шаг</h3>
        <p className="text-sm text-muted-foreground text-red-400">
          Чтобы продолжить работу с ботом нужно заполнить профиль
        </p>
        <div className=" flex gap-1">
          <p>{currentUser?.userName}</p>
          <p>{currentUser?.id}</p>
          <p>{currentUser?.telegramId}</p>
        </div>
        <Separator />
      </div>
      <CreatedProfile userId={currentUser.id} />
    </main>
  )
}

export default NewUserPage
