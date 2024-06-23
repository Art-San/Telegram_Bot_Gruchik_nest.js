import { FC, useState } from 'react'

import ListUsersForAdmin from '@/components/List/Users/ListUsersForAdmin'
import { Search } from 'lucide-react'
import { useDebounce } from './hooks/useDebounce'

const UsersPageAdmin: FC = () => {
  return (
    <>
      <div className=" mt-3 ">
        {/* <Search /> */}
        <ListUsersForAdmin />
      </div>
    </>
  )
}

export default UsersPageAdmin
