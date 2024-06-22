import { FC } from 'react'
import ListOrdersForAdmin from '@/components/List/ListOrdersForAdmin'
import { useSearchUsers } from './hooks/useSearchUsers'
import ListUsersForAdmin from '@/components/List/Users/ListUsersForAdmin'

const UsersPageAdmin: FC = () => {
  return (
    <>
      <div className=" mt-3 ">
        {/* <ListOrdersForAdmin /> */}
        <ListUsersForAdmin />
      </div>
    </>
  )
}

export default UsersPageAdmin
