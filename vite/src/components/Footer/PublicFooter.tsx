import {
  FileQuestion,
  NotebookPen,
  ReceiptText,
  Ruler,
  User
} from 'lucide-react'
import { Link } from 'react-router-dom'
const PublicFooter = () => {
  return (
    <footer className="w-full h-16 bg-slate-100 flex justify-center items-center gap-4 px-4">
      <Link to="/help" className="flex flex-col items-center text-gray-900">
        <FileQuestion />
        <p className="text-xs">Помощь</p>
      </Link>
      <Link to="/roles" className="flex flex-col items-center text-gray-900">
        <Ruler />
        <p className="text-xs">Правила</p>
      </Link>
      <Link to="#" className="flex flex-col items-center text-gray-900">
        <NotebookPen />
        <p className="text-xs">Написать</p>
      </Link>
      <Link
        to="/profile/creating"
        className="flex flex-col items-center text-gray-900"
      >
        {/* <ReceiptText /> */}
        <User />
        <p className="text-xs">Test</p>
      </Link>
    </footer>
  )
}

export default PublicFooter
