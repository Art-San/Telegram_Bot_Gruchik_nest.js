// src/utils/dateUtils.ts
export function transformDate(datetimeStr: string): string {
  const date = new Date(datetimeStr)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  // const year = String(date.getFullYear()).slice(-2)
  return `${day}/${month}`
}
export function transformDate2(datetimeStr: string): string {
  const date = new Date(datetimeStr)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2)
  return `${day}/${month}/${year}`
}

// const datetimeStr = '2024-06-11T15:08:28.891Z';
// const formattedDate = transformDate(datetimeStr);
// console.log(formattedDate);  // Output: 11/06/24
