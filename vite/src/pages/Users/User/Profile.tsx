import BackButton from '@/components/Buttons/BackButton'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Profile: FC = () => {
  const { telegramId } = useParams()
  console.log(123, 'Profile', telegramId)
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  return (
    <div className="">
      <div className=" flex  w-1/3 justify-between">
        <BackButton />
        <Button variant={'outline'} onClick={goBack}>
          <p>Удалить</p> <Trash size={15} />
        </Button>
      </div>
      {/* <div className=" flex items-center justify-center  w-screen"> */}
      <p className=" text-blue-600">
        Страница профиля с возможность редактирования некоторых полей
      </p>
    </div>
  )
}

export default Profile
