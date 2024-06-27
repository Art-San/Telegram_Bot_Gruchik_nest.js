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

      {currentUser?.id && <CreatedProfile userId={currentUser.id} />}

      {/* {data ? (
        <UpdateProfileForm
          userId={currentUser?.id}
          // profile={profileQuery.data.profile}
          // callbackUrl={searchParams.callbackUrl}
        />
      ) : (
        <CreatedProfile userId={currentUser?.id}/>
      )} */}
    </main>
  )
}

export default ProfilePage

// import { useEffect, useState } from 'react'
// import { Separator } from '@/components/ui/separator'
// import { useUserStore } from '@/zustand/useUserStore'
// import { useUserProfile } from './hooks/useUserProfile'
// import { Spinner } from '@/components/ui/spinner'

// const CreatedProfilePage = () => {
//   const currentUser = useUserStore((state) => state.currentUser)
//   const [userId, setUserId] = useState<number | null>(null)

//   в библиотеке @tanstack/react-query есть "enabled: !!userId" и тогда можно обойтись без useEffect
//   useEffect(() => {
//     if (currentUser?.id) {
//       setUserId(currentUser.id)
//     }
//   }, [currentUser])

//   const { data, isLoading, isError } = useUserProfile(userId)

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen w-screen">
//         <Spinner
//           className="mr-2 h-8 w-8 animate-spin"
//           aria-label="Загрузка профиля"
//         />
//       </div>
//     )
//   }

//   if (isError) {
//     return <div>Error loading profile</div>
//   }

//   if (!data) {
//     return null // или другой UI, пока данные не загружены
//   }

//   return (
//     <main className="space-y-6 py-14 container max-w-[600px]">
//       <div>
//         <h3 className="text-lg font-medium">Важный шаг</h3>
//         <p className="text-sm text-muted-foreground text-red-400">
//           Чтобы продолжить работу с ботом нужно заполнить профиль
//         </p>
//         <div className="flex gap-1">{/* ... */}</div>
//       </div>
//       <Separator />
//       {/* <UpdateProfileForm userId={currentUser?.id} profile={data.profile} /> */}
//     </main>
//   )
// }

// export default CreatedProfilePage
