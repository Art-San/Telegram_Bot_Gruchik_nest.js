import { toast } from 'sonner'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ProfileService } from '@/services/profile/profile.service'
import { IDataFormCreateProfile } from '@/types/profile.types'

export function useCreateProfile(
  onSuccessCallback: () => void,
  onErrorCallback: () => void
) {
  const queryClient = useQueryClient()

  const {
    mutate: createProfile,
    isPending,
    isSuccess,
    isError
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
        queryKey: ['user', 'profile']
      })
      onSuccessCallback() // вызываем колбэк при успешном создании профиля
    },
    onError() {
      toast.error('Ошибка при создании профиля')
      onErrorCallback() // вызываем колбэк при ошибке создания профиля
    }
  })

  // если  mutate то react-query сам обрабатывает ошибки
  // если  mutateAsync то самому придется обрабатывает ошибки

  return { createProfile, isPending, isSuccess, isError }
}

// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { ProfileService } from '@/services/profile/profile.service';
// import { IDataFormCreateProfile } from '@/types/profile.types';
// import { toast } from 'react-toastify';

// export function useCreateProfile(onSuccessCallback: () => void, onErrorCallback: () => void) {
//   const queryClient = useQueryClient();

//   const {
//     mutate: createProfile,
//     isPending,
//     isSuccess,
//     isError
//   } = useMutation({
//     mutationKey: ['create profile'],
//     mutationFn: ({
//       userId,
//       data
//     }: {
//       userId: number
//       data: IDataFormCreateProfile
//     }) => ProfileService.updateProfile(userId, data),
//     onSuccess() {
//       toast.success('Успешно создан профиль');
//       queryClient.invalidateQueries({
//         queryKey: ['profile']
//       });
//       onSuccessCallback(); // вызываем колбэк при успешном создании профиля
//     },
//     onError() {
//       toast.error('Ошибка при создании профиля');
//       onErrorCallback(); // вызываем колбэк при ошибке создания профиля
//     }
//   });

//   return { createProfile, isPending, isSuccess, isError };
// }
