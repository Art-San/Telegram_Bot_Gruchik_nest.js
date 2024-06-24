// src/components/UsersList.tsx
import RatingStar from '@/components/Rating/RatingStar'
import { getUserProfile } from '@/configs/api.config'
import { IUser } from '@/types/users.types'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface UserListProps {
  users: IUser[]
}

const UsersList: FC<UserListProps> = ({ users }) => {
  const urlImg = (num: any) => {
    return `https://randomuser.me/api/portraits/women/${num}.jpg`
  }
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-2">
      <div className="bg-gray-100 py-2 px-4">
        <h2 className="text-xl font-semibold text-gray-800">Top Users</h2>
      </div>
      <ul className=" divide-y divide-gray-200">
        {Array.isArray(users) &&
          users.map((user) => (
            <li key={user?.id} className="flex items-center py-4 px-6">
              <span className="text-gray-700 text-lg font-medium mr-4">
                {user.id}
              </span>
              <img
                className="w-12 h-12 rounded-full object-cover mr-4"
                // src={user?.userAvatar || '/avatar.png'}
                src={urlImg(user?.id)}
                // src="https://randomuser.me/api/portraits/women/72.jpg"
                alt="User avatar"
              />
              <div className="flex-1">
                <Link to={getUserProfile(`/${user?.telegramId}`)}>
                  <h3 className="text-lg font-medium text-gray-800">
                    {user?.userName}
                  </h3>
                </Link>
                <p className="text-gray-600 text-base">{user?.telegramId}</p>
              </div>
              <RatingStar />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default UsersList
