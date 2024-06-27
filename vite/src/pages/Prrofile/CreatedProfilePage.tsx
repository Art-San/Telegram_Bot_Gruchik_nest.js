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

const phoneRegex = new RegExp(/^\+\d{11}$/)

const profileFormSchema = z.object({
  role: z.string(),
  phone: z
    .string()
    .regex(
      phoneRegex,
      'Номер телефона должен состоять из 12 знаков, включая +, например: +79138159171'
    ),

  fullName: z
    .string()
    .max(30, {
      message: 'Имя пользователя не должно быть длиннее 30 символов.'
    })
    .transform((name) => name.trim()),
  userAvatar: z.string().url().optional()
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface CreatedProfileProps {
  userId: number
}

const CreatedProfile: React.FC<CreatedProfileProps> = ({ userId }) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      role: '',
      phone: '',
      fullName: '',
      userAvatar: ''
    }
  })

  const { createProfile, isPending } = useCreateProfile()

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data)
    const newProfile = createProfile({
      userId,
      data
    })
    console.log(newProfile)
  })

  return (
    <div className="m-0 w-[330px] flex flex-col  justify-center text-slate-700">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Специализация</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите один из вариантов" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="loader">Грузчик</SelectItem>
                    <SelectItem value="foreman">Водитель</SelectItem>
                    <SelectItem value="dispatcher">Водитель-грузчик</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Выберите специализацию </FormDescription>
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
            Отправить
            {/* {submitText} */}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreatedProfile
