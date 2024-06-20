import React from 'react'
import {
  Package,
  Sofa,
  Refrigerator,
  Cuboid,
  HardHat,
  Trash2,
  Piano,
  Anvil,
  CircleHelp,
  UserPlus,
  LockKeyhole,
  ShieldQuestion
} from 'lucide-react'

// export const validIconTypeWork = (type: string) => {
//   switch (type) {
//     case 'moving':
//       return <p>п/в/м</p>
//     case 'construction':
//       return <p>с/м/м</p>
//     case 'rigging':
//       return <p>т/п/с</p>
//     default:
//       return <CircleHelp />
//   }
// }
// export const validTextTypeWork = (type: string) => {
//   switch (type) {
//     case 'moving':
//       return <p>Переезд, вещи, меб.</p>
//     case 'construction':
//       return <p>Строй-мат, мусор</p>
//     case 'rigging':
//       return <p>Пианино, такелаж</p>
//     default:
//       return <CircleHelp />
//   }
// }

// export const validIconTypeWork = (type: string) => {
//   const iconMap = {
//     moving: [<Package />, <Sofa />, <Refrigerator />],
//     construction: [<HardHat />, <Cuboid />, <Trash2 />],
//     rigging: [<Piano />, <Anvil />]
//   }

//   return <div className="flex gap-1">{iconMap[type] || <CircleHelp />}</div>
// }
export const validIconTypeWork = (type: string) => {
  const iconMap = {
    moving: (
      <span className="flex gap-1">
        <Package /> <Sofa /> <Refrigerator />
      </span>
    ),
    construction: (
      <span className="flex gap-1">
        <HardHat /> <Cuboid /> <Trash2 />
      </span>
    ),
    rigging: (
      <span className="flex gap-1">
        <Piano /> <Anvil />
      </span>
    )
  }

  // Используем утверждение типа для ключа
  const icons = iconMap[type as keyof typeof iconMap]
  return <div className="flex gap-1">{icons || <CircleHelp />}</div>
}

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
  created: <p className=" text-green-700">Открыто</p>,
  pending: <p className=" text-orange-400">Закрыто</p>,
  inProgress: <p className=" text-orange-400">Закрыто</p>,
  completed: <p className=" text-green-700">Закрыто</p>,
  default: <ShieldQuestion size={20} />
}
// const statusMessages: { [key: string]: JSX.Element } = {
//   created: <p className=" text-green-700">Открыто</p>,
//   pending: <LockKeyhole size={20} className="text-orange-400 " />,
//   inProgress: <LockKeyhole size={20} className="text-orange-400" />,
//   completed: <LockKeyhole size={20} className="text-green-700" />,
//   default: <ShieldQuestion size={20} />
// }
// const statusMessages: { [key: string]: JSX.Element } = {
//   created: <UserPlus className=" text-green-700" />,
//   pending: <LockKeyhole className="text-orange-400" />,
//   inProgress: <LockKeyhole className="text-orange-400" />,
//   completed: <LockKeyhole className="text-green-700" />,
//   default: <ShieldQuestion />
// }

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
