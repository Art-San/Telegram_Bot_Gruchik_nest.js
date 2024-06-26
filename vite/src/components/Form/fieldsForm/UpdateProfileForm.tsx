import { Spinner } from '@/components/ui/spinner'
import { useQuery } from '@tanstack/react-query'
// import { ProfileForm } from './_ui/profile-form'
// import { Spinner } from '@/shared/ui/spinner'
// import { useRouter } from 'next/navigation'
import {
  // getProfileQuery,
  useUserProfile
} from '@/pages/Users/hooks/useUserProfile'

export function UpdateProfileForm({
  userId,
  callbackUrl
}: {
  userId: number
  callbackUrl?: string
}) {
  const { data, isLoading, isError } = useUserProfile(userId)
  // const router = useRouter()
  const handleSuccess = () => {
    if (callbackUrl) {
      // router.push(callbackUrl)
    }
  }

  return <div className="">UpdateProfileForm</div>
}
// import { useQuery } from '@tanstack/react-query'
// import { ProfileForm } from './_ui/profile-form'
// import { Spinner } from '@/shared/ui/spinner'
// import { useRouter } from 'next/navigation'
// import { getProfileQuery } from '@/entities/user/_queries'

// export function UpdateProfileForm({
// 	userId,
// 	callbackUrl,
// }: {
// 	userId: string
// 	callbackUrl?: string
// }) {
// 	const profileQuery = useQuery({
// 		...getProfileQuery(userId),
// 		retry: 0,
// 	})

// 	const router = useRouter()
// 	const handleSuccess = () => {
// 		if (callbackUrl) {
// 			router.push(callbackUrl)
// 		}
// 	}

// 	if (profileQuery.isPending) {
// 		return <Spinner aria-label="Загрузка профиля" />
// 	}

// 	if (!profileQuery.data) {
// 		return <div>Не удалось загрузить профиль, возможно у вас нет прав</div>
// 	}

// 	return (
// 		<ProfileForm
// 			userId={userId}
// 			profile={profileQuery.data.profile}
// 			onSuccess={handleSuccess}
// 			submitText={callbackUrl ? 'Продолжить' : 'Сохранить'}
// 		/>
// 	)
// }
