// // src/components/TableOrders.tsx
// import React from 'react'
// import { Link } from 'react-router-dom'
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from '@/components/ui/table'
// import { View } from 'lucide-react'
// import { IOrder } from '@/shared/types/order.types'
// import { getOrderUrl } from '@/configs/api.config'
// import { validIcon } from '@/utils/iconUtils'

// interface ITableOrdersProps {
//   orders: IOrder[]
// }

// const TableOrders: React.FC<ITableOrdersProps> = ({ orders }) => {
//   return (
//     <>
//       <Table className="">
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[]">№</TableHead>
//             <TableHead>Тип</TableHead>
//             <TableHead>Статус</TableHead>
//             <TableHead className="text-right">Цена/ч</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody className="">
//           {orders &&
//             orders.map((order) => (
//               <TableRow
//                 key={order.id}
//                 className=" hover:bg-slate-200 hover:text-gray-600"
//               >
//                 <TableCell className="font-medium">{order?.id}</TableCell>
//                 <TableCell>{validIcon(order?.typeWork)}</TableCell>
//                 <TableCell>{order?.status}</TableCell>
//                 <TableCell className="text-right">{order?.hourCost}</TableCell>
//                 <TableCell className="font-medium">
//                   <Link to={getOrderUrl(`/${order.id}`)}>
//                     <View className=" text-blue-400" />
//                   </Link>
//                 </TableCell>
//               </TableRow>
//             ))}
//         </TableBody>
//         <TableCaption>A list of your recent invoices.</TableCaption>
//       </Table>
//     </>
//   )
// }

// export default TableOrders
