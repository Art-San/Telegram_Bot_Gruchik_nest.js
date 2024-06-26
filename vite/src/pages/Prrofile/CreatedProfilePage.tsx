import { Separator } from '@/components/ui/separator'
import { useUserStore } from '@/zustand/useUserStore'

import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import UpdateProfileForm from './UpdateProfileForm'
import { useUserProfile } from './hooks/useUserProfile'

const CreatedProfilePage = () => {
  const currentUser = useUserStore((state) => state.currentUser)

  const { data, isLoading, isError } = useUserProfile(currentUser?.id)

  console.log(123, 'data', currentUser)
  // if (!currentUser) {
  //   return <Navigate to="/login " />
  // }
  return (
    <main className="space-y-6 py-14 container  max-w-[600px]">
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
      </div>
      <Separator />
      {/* <UpdateProfileForm
        userId={currentUser?.id}
        profile={profileQuery.data.profile}
        callbackUrl={searchParams.callbackUrl}
      /> */}
    </main>
  )
}

export default CreatedProfilePage
