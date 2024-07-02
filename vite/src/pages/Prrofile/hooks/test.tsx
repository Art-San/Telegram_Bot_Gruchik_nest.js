// import { ProfileService } from '@/services/profile/profile.service'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { toast } from 'sonner'

// // Интерфейс для параметров функции mutationFn
// interface UpdateProfileParams {
//   userId: string
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
//     UpdateProfileParams
//   >({
//     mutationKey: ['profile update'],
//     mutationFn: ({ userId, data }) =>
//       ProfileService.updateProfile(userId, data),
//     onSuccess() {
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

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'

// import { Button } from '@/components/ui/button'
// import { Spinner } from '@/components/ui/spinner'

// import { useNavigate } from 'react-router-dom'
// import { useGetProfile } from './hooks/useGetProfile'
// import { useUpdateProfile } from './hooks/useUpdateProfile'

// import { IDataFormUpdateProfile } from '@/types/profile.types'

// const phoneRegex = new RegExp(/^(?:\+7|8)\d{10}$/)

// const profileFormSchema = z.object({
//   role: z.string().min(1, {
//     message: 'Специализация пользователя обязательна к заполнению.'
//   }),
//   phone: z
//     .string()
//     .regex(
//       phoneRegex,
//       'Номер телефона должен быть, например: +79138159171 или 89138159171'
//     ),
//   fullName: z
//     .string()
//     .min(1, {
//       message: 'Имя пользователя обязательно к заполнению.'
//     })
//     .max(30, {
//       message: 'Имя пользователя не должно быть длиннее 30 символов.'
//     })
//     .transform((name) => name.trim()),
//   userAvatar: z
//     .string()
//     .url({
//       message:
//         'Должен выглядеть так https://avatarzo.ru/wp-content/uploads/sportivnyj-bmw.jpg'
//     })
//     .optional()
// })

// type ProfileFormValues = z.infer<typeof profileFormSchema>

// const getDefaultValues = (profile?: IDataFormUpdateProfile) => ({
//   role: profile?.role ?? '',
//   phone: profile?.phone ?? '',
//   fullName: profile?.fullName ?? '',
//   userAvatar: profile?.userAvatar ?? ''
// })

// interface CreatedProfileProps {
//   userId: number
// }

// const UpdateProfileForm: React.FC<CreatedProfileProps> = ({ userId }) => {
//   const navigate = useNavigate()
//   const { data, isLoading, isError } = useGetProfile(userId)
//   const { updateProfile, isPending } = useUpdateProfile()

//   const form = useForm<ProfileFormValues>({
//     resolver: zodResolver(profileFormSchema),
//     defaultValues: getDefaultValues()
//   })

//   // Обновление значений формы после загрузки данных
//   useEffect(() => {
//     if (data) {
//       form.reset(getDefaultValues(data))
//     }
//   }, [data, form])

//   const handleSubmit = form.handleSubmit(async (data) => {
//     updateProfile({ userId: String(userId), data })
//   })

//   if (isLoading) {
//     return <Spinner aria-label="Загрузка профиля" />
//   }

//   if (!data) {
//     return <div>Не удалось загрузить профиль, возможно у вас нет прав</div>
//   }

//   return (
//     <div className="m-0 w-[330px] flex flex-col justify-center text-slate-700">
//       <Form {...form}>
//         <form onSubmit={handleSubmit} className="space-y-8">
//           <FormField
//             control={form.control}
//             name="role"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Специализация</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Грузчик" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="phone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Номер телефона</FormLabel>
//                 <FormControl>
//                   <Input placeholder="+7XXXXXXXXXX" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="fullName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Имя пользователя</FormLabel>
//                 <FormControl>
//                   <Input placeholder="" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="userAvatar"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Аватарка</FormLabel>
//                 <FormControl>
//                   <Input placeholder="" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button type="submit" disabled={isPending}>
//             Сохранить
//           </Button>
//         </form>
//       </Form>
//     </div>
//   )
// }

// export default UpdateProfileForm
