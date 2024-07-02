import { ProfileService } from '@/services/profile/profile.service'
import { IUpdateProfileParams } from '@/types/profile.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

// Интерфейс для параметров функции mutationFn

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  const { mutate: updateProfile, isPending } = useMutation({
    mutationKey: ['profile update'],
    mutationFn: ({ userId, data }: IUpdateProfileParams) =>
      ProfileService.updateProfile(userId, data),
    onSuccess() {
      toast.success('Профиль успешно обновлен')
      queryClient.invalidateQueries({
        queryKey: ['profile']
      })
    }
  })

  return {
    updateProfile,
    isPending
  }
}

// import { ProfileService } from '@/services/profile/profile.service'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { toast } from 'sonner'

// // Интерфейс для параметров функции mutationFn
// interface IUpdateProfileParams {
//   userId: number
//   data: {
//     role?: string
//     phone?: string
//     fullName?: string
//     userAvatar?: string
//   }
// }

// export const useUpdateProfile = () => {
//   const queryClient = useQueryClient()

//   const { mutate: updateProfile, isPending } = useMutation<
//     void,
//     unknown,
//     IUpdateProfileParams
//   >({
//     mutationKey: ['profile update'],
//     mutationFn: ({ userId, data }) =>
//       ProfileService.updateProfile(userId, data),
//     async onSuccess() {
//       toast.success('Профиль успешно обновлен')
//       queryClient.invalidateQueries({
//         queryKey: ['profile']
//       })
//     }
//   })

//   return {
//     updateProfile,
//     isPending
//   }
// }
