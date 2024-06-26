import { Separator } from '@/components/ui/separator'
import { useUserStore } from '@/zustand/useUserStore'

import { FC } from 'react'

const CreatedProfilePage: FC = () => {
  const currentUser = useUserStore((state) => state.currentUser)
  return (
    <main className="space-y-6 py-14 container  max-w-[600px]">
      <div>
        <h3 className="text-lg font-medium">Важный шаг</h3>
        <p className="text-sm text-muted-foreground">
          Чтобы продолжить работу с ботом нужно заполнить профиль
        </p>
        <div className=" flex gap-1">
          <p>{currentUser?.userName}</p>
          <p>{currentUser?.id}</p>
          <p>{currentUser?.telegramId}</p>
        </div>
      </div>
      <Separator />
      {/* <UpdateProfileForm
				userId={session.user.id}
				callbackUrl={searchParams.callbackUrl}
			/> */}
    </main>
  )
}

export default CreatedProfilePage
