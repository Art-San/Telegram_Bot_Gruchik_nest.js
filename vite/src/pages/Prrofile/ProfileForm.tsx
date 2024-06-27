// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from '@/ui/form'
// import { Input } from '@/ui/input'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'

// const phoneRegex = new RegExp(
//   /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
// )

// const profileFormSchema = z.object({
//   // phone: z
//   //   .string()
//   //   .length(12, {
//   //     message: 'Номер телефона должен состоять из 12 знаков +79138159177'
//   //   }),
//   phone: z
//     .string()
//     .regex(
//       phoneRegex,
//       'Номер телефона должен состоять из 12 знаков +79138159177'
//     ),

//   fullName: z
//     .string()
//     .max(30, {
//       message: 'Имя пользователя не должно быть длиннее 30 символов.'
//     })
//     .transform((name) => name.trim()),
//   userAvatar: z.string().url().optional()
// })

// type ProfileFormValues = z.infer<typeof profileFormSchema>

// const ProfileForm = ({
//   userId,
//   submitText = 'Сохранить'
// }: {
//   userId: number | undefined
//   submitText: string
// }) => {
//   const form = useForm<ProfileFormValues>({
//     resolver: zodResolver(profileFormSchema)
//     // defaultValues: getDefaultValues(profile)
//   })
//   const handleSubmit = form.handleSubmit(async (data) => {
//     const newProfile = await updateProfile.update({
//       userId,
//       data
//     })

//     // form.reset(getDefaultValues(newProfile.profile))
//     // onSuccess?.()
//   })

//   return (
//     <Form {...form}>
//       <form onSubmit={handleSubmit} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           disabled
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input placeholder="" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Имя пользователя</FormLabel>
//               <FormControl>
//                 <Input placeholder="" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="image"
//           disabled
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Аватарка</FormLabel>
//               <FormControl>
//                 <AvatarField value={field.value} onChange={field.onChange} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">
//           {updateProfile.isPending && (
//             <Spinner
//               className="mr-2 h-4 w-4 animate-spin"
//               aria-label="Обновление профиля"
//             />
//           )}
//           {submitText}
//         </Button>
//       </form>
//     </Form>
//   )
// }

// export default ProfileForm
