import { useUserStore } from '@/zustand/useUserStore'
import { Separator } from '@radix-ui/react-select'

const Profile = () => {
  const currentUser = useUserStore((state) => state.currentUser)

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

      {/* <UpdateProfileForm userId={currentUser.id} /> */}
    </main>
  )
}

export default Profile
