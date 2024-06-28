// import { useNavigate } from 'react-router-dom'
// import { useForm } from 'react-hook-form'
// import { useCreateProfile } from '@/hooks/useCreateProfile'
// import { IDataFormCreateProfile } from '@/types/profile.types'
// import { Spinner } from '@/components/ui/spinner'

// const CreatedProfilePage = ({ userId }: { userId: number }) => {
//   const navigate = useNavigate()
//   const form = useForm<IDataFormCreateProfile>()

//   const onSuccess = () => {
//     navigate('/success-page') // перенаправление на страницу успеха
//   }

//   const onError = () => {
//     navigate('/error-page') // перенаправление на страницу ошибки
//   }

//   const { createProfile, isPending } = useCreateProfile(onSuccess, onError)

//   const handleSubmit = form.handleSubmit((data) => {
//     createProfile({
//       userId,
//       data
//     })
//   })

//   if (isPending) {
//     return (
//       <div className="flex items-center justify-center h-screen w-screen">
//         <Spinner
//           className="mr-2 h-8 w-8 animate-spin"
//           aria-label="Создание профиля"
//         />
//       </div>
//     )
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Поля формы */}
//       <button type="submit">Создать профиль</button>
//     </form>
//   )
// }

// export default CreatedProfilePage

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
