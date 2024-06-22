import { Button } from '@/components/ui/button'
import { ArrowBigLeft } from 'lucide-react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const BackButton: FC = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  return (
    <Button variant={'ghost'} onClick={goBack}>
      {/* <Button onClick={() => navigate(-1)}> */}
      <ArrowBigLeft /> <p>назад</p>
    </Button>
  )
}

export default BackButton
