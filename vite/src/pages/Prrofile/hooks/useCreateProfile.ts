import { toast } from 'sonner'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ProfileService } from '@/services/profile/profile.service'
import { IDataFormCreateProfile } from '@/types/profile.types'

export function useCreateProfile() {
  const queryClient = useQueryClient()

  const {
    mutate: createProfile,
    isPending,
    isSuccess
  } = useMutation({
    mutationKey: ['create profile'],
    mutationFn: ({
      userId,
      data
    }: {
      userId: number
      data: IDataFormCreateProfile
    }) => ProfileService.updateProfile(userId, data),
    onSuccess() {
      toast.success('Успешно создан профиль')
      queryClient.invalidateQueries({
        queryKey: ['profile']
      })
    }
  })

  // если  mutate то react-query сам обрабатывает ошибки
  // если  mutateAsync то самому придется обрабатывает ошибки

  return { createProfile, isPending, isSuccess }
}
