// src/components/UserList.tsx
import { IUser } from '@/types/users.types'
import { FC } from 'react'

interface UserListProps {
  users: IUser[]
}

const UserList: FC<UserListProps> = ({ users }) => {
  return (
    <ul className="bg-slate-50 flex flex-col gap-1 shadow overflow-hidden sm:rounded-md max-w-sm mx-auto">
      {Array.isArray(users) &&
        users.map((user) => (
          <li key={user.id}>
            <p>{user?.userName}</p>
          </li>
        ))}
    </ul>
  )
}

export default UserList
