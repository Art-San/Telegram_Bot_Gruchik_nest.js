import { Spinner } from '@/components/ui/spinner'
import { useGetProfile } from './hooks/useGetProfile'
import ProfileForm from './ProfileForm'

interface IUpdatedProfileProps {
  userId: number
}

const UpdateProfileForm: React.FC<IUpdatedProfileProps> = ({ userId }) => {
  const { data, isLoading, isPending, isError } = useGetProfile(userId)

  if (isPending) {
    return <Spinner aria-label="Загрузка профиля" />
  }

  if (!data) {
    return <div>Не удалось загрузить профиль, возможно у вас нет прав</div>
  }

  return (
    <ProfileForm
      userId={userId}
      profile={data}
      // onSuccess={handleSuccess}
      // submitText={'Сохранить'}
    />
  )
}

export default UpdateProfileForm
