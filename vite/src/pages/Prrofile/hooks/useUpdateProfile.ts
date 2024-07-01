// import { ProfileService } from '@/services/profile/profile.service'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { toast } from 'sonner'

// export const useUpdateProfile = () => {
//   const queryClient = useQueryClient()

//   const { mutate: updateProfile, isPending } = useMutation({
//     mutationKey: ['profile update'],
//     mutationFn: ({userId, data}) => ProfileService.updateProfile(userId, data),
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
