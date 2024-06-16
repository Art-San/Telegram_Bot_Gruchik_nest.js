import React from 'react'
import { useUserContext } from '@/context/useUser'

const PublicHeader: React.FC = () => {
  const { currentUser } = useUserContext()

  return (
    <header className="w-screen h-16 bg-white shadow-md flex justify-center items-center gap-2 px-4">
      {/* <header className="w-screen h-16 bg-white shadow-md flex justify-between items-center px-4"> */}
      <div className="flex space-x-4">
        <span>Заказы</span>
        <span>Профиль</span>
        <span>{currentUser?.userName || 'null'}</span>
      </div>
      <img
        src={currentUser?.userAvatar || 'avatar.png'}
        alt="Аватар пользователя"
        className="h-10 w-10 rounded-full"
      />
    </header>
  )
}

export default PublicHeader

// import React from 'react';
// import { useUser } from '../UserContext';
// import { useUserContext } from '@/context/useUser';

// const Header: React.FC = () => {
//   const { currentUser } = useUser();

//   if (!currentUser) {
//     return null;
//   }

//   return (
//     <header>
//       <img src={currentUser.userAvatar} alt="User Avatar" />
//       <span>{currentUser.userName}</span>
//     </header>
//   );
// };

// export default Header;
