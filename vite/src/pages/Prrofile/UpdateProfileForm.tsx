import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useCreateProfile } from './hooks/useCreateProfile'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useGetProfile } from './hooks/useGetProfile'
import { useUserProfileStore } from '@/zustand/useUserProfileStore'
import { IDataFormUpdateProfile } from '@/types/profile.types'
// const phoneRegex = new RegExp(/^\+\d{11}$/)  // +79138159171
const phoneRegex = new RegExp(/^(?:\+7|8)\d{10}$/) // +79138159171 или 89138159171

const profileFormSchema = z.object({
  role: z
    .string()
    .min(1, {
      message: 'Специализация пользователя обязательна к заполнению.'
    })
    .optional(),
  phone: z
    .string()
    .regex(
      phoneRegex,
      'Номер телефона должен быть, например: +79138159171 или 89138159171'
    )
    .optional(),
  fullName: z
    .string()
    .min(1, {
      message: 'Имя пользователя обязательно к заполнению.'
    })
    .max(30, {
      message: 'Имя пользователя не должно быть длиннее 30 символов.'
    })
    .transform((name) => name.trim())
    .optional(),
  userAvatar: z
    .string()
    .url({
      message:
        'Должен выглядеть так https://avatarzo.ru/wp-content/uploads/sportivnyj-bmw.jpg'
    })
    .optional()
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const getDefaultValues = (profile: IDataFormUpdateProfile) => ({
  role: profile.role,
  phone: profile.phone ?? undefined,
  fullName: profile.fullName ?? '',
  userAvatar: profile.userAvatar ?? ''
})

interface CreatedProfileProps {
  userId: number
}

const UpdateProfileForm: React.FC<CreatedProfileProps> = ({ userId }) => {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetProfile(userId)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: getDefaultValues(data)
  })

  console.log(12, data)
  console.log(13, isLoading)
  console.log(15, isError)

  // const {setUserProfile} = useUserProfileStore()
  // const onSuccess = () => {
  //   navigate('/orders') // перенаправление на страницу успеха
  // }

  // const onError = () => {
  //   navigate('/orders') // перенаправление на страницу ошибки
  // }

  // const { createProfile, isPending } = useCreateProfile(onSuccess, onError)

  // const handleSubmit = form.handleSubmit(async (data) => {
  //   const newProfile = createProfile({
  //     userId,
  //     data
  //   })
  // })
  if (isLoading) {
    return <Spinner aria-label="Загрузка профиля" />
  }
  if (!data) {
    return <div>Не удалось загрузить профиль, возможно у вас нет прав</div>
  }
  return (
    <div className="m-0 w-[330px] flex flex-col  justify-center text-slate-700">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <FormField
            control={form.control}
            name="role"
            disabled
            render={({ field }) => (
              <FormItem>
                <FormLabel>Специализация</FormLabel>
                <FormControl>
                  <Input placeholder="Грузчик" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Номер телефона</FormLabel>
                <FormControl>
                  <Input placeholder="+7XXXXXXXXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя пользователя</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userAvatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Аватарка</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isPending && (
              <Spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-label="Обновление профиля"
              />
            )}
            Сохранить
            {/* {submitText} */}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default UpdateProfileForm
