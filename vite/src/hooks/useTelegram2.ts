// import { useEffect, useState } from 'react'

// export const useTelegram2 = () => {
//   const [userId, setUserId] = useState<number | null>(null)

//   useEffect(() => {
//     const tg = (window as any).Telegram.WebApp
//     const userId = tg.initDataUnsafe?.user?.id
//     setUserId(userId)
//   }, [])

//   return { userId }
// }
