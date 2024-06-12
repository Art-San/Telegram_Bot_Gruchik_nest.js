import React from 'react'
import {
  // Package,
  // Sofa,
  // Refrigerator,
  // Cuboid,
  // HardHat,
  // Trash2,
  // Piano,
  // Anvil,
  CircleHelp,
  UserPlus,
  LockKeyhole,
  ShieldQuestion
} from 'lucide-react'

export const validIconTypeWork = (type: string) => {
  switch (type) {
    case 'moving':
      return <p>п/в/м</p>
    case 'construction':
      return <p>с/м/м</p>
    case 'rigging':
      return <p>т/п/с</p>
    default:
      return <CircleHelp />
  }
}

// export const validIconTypeWork = (type: string) => {
//   const iconMap = {
//     moving: [<Package />, <Sofa />, <Refrigerator />],
//     construction: [<HardHat />, <Cuboid />, <Trash2 />],
//     rigging: [<Piano />, <Anvil />]
//   }

//   return <div className="flex gap-1">{iconMap[type] || <CircleHelp />}</div>
// }
// export const validIconTypeWork = (type: string) => {
//   const iconMap = {
//     moving: (
//       <div className="flex gap-1">
//         <Package />, <Sofa />, <Refrigerator />
//       </div>
//     ),
//     construction: (
//       <div className="flex gap-1">
//         <HardHat />, <Cuboid />, <Trash2 />
//       </div>
//     ),
//     rigging: (
//       <div className="flex gap-1">
//         <Piano />, <Anvil />
//       </div>
//     )
//   }

//   // Используем утверждение типа для ключа
//   const icons = iconMap[type as keyof typeof iconMap]
//   return <div className="flex gap-1">{icons || <CircleHelp />}</div>
// }
// export const validIconTypeWork = (type: string) => {
//   const iconMap: Record<string, JSX.Element[]> = {
//     moving: [<Package />, <Sofa />, <Refrigerator />],
//     construction: [<HardHat />, <Cuboid />, <Trash2 />],
//     rigging: [<Piano />, <Anvil />]
//   }

//   // Используем утверждение типа для ключа
//   const icons = iconMap[type as keyof typeof iconMap]
//   return <div className="flex gap-1">{icons || <CircleHelp />}</div>
// }

// export const validIconStatus = (status: string) => {
//   switch (status) {
//     case 'created':
//       return <p>Создана</p>
//     case 'pending':
//       return <p>Ожидание</p>
//     case 'inProgress':
//       return <p>В процессе</p>
//     case 'completed':
//       return <p>Выполнена</p>
//     default:
//       return <p>Так</p>
//   }
// }

//=======================================================
const statusMessages: { [key: string]: JSX.Element } = {
  created: <UserPlus className=" text-green-700" />,
  pending: <LockKeyhole className="text-orange-400" />,
  inProgress: <LockKeyhole className="text-orange-400" />,
  completed: <LockKeyhole className="text-green-700" />,
  default: <ShieldQuestion />
}

// <LockKeyhole /> замок закрыт
// <LockKeyholeOpen /> замок открыт
// <UserPlus /> человек с +

export const validIconStatus = (status: string) => {
  return statusMessages[status] || statusMessages.default
}
// ====================================================
// const statusMessages: { [key: string]: string } = {
//   created: 'Создана',
//   pending: 'Ожидание',
//   inProgress: 'В процессе',
//   completed: 'Выполнена',
//   default: 'Так'
// }

// export const validIconStatus = (status: string) => {
//   return <p>{statusMessages[status] || statusMessages.default}</p>
// }
