import { Separator } from '@/components/ui/separator'
import { useUserStore } from '@/zustand/useUserStore'
import { useGetProfile } from './hooks/useGetProfile'
import { Spinner } from '@/components/ui/spinner'
import CreatedProfile from './CreatedProfilePage'
import UpdateProfileForm from './UpdateProfileForm'

const ProfilePage = () => {
  const currentUser = useUserStore((state) => state.currentUser)

  // const { data, isLoading, isError } = useGetProfile(currentUser?.id)

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen w-screen">
  //       <Spinner
  //         className="mr-2 h-8 w-8 animate-spin"
  //         aria-label="Загрузка профиля"
  //       />
  //     </div>
  //   )
  // }

  // if (isError) {
  //   return <div>Error loading profile</div>
  // }

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

  console.log(123, currentUser.profileFilled)

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
      {currentUser.profileFilled ? (
        <UpdateProfileForm userId={currentUser.id} />
      ) : (
        <CreatedProfile userId={currentUser.id} />
      )}
    </main>
  )
}

export default ProfilePage