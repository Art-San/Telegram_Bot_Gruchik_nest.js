// export const errorCatch = (error) =>
//   error.response && error.response.data
//     ? typeof error.response.data.message === 'object'
//       ? error.response.data.message[0]
//       : error.response.data.message
//     : error.message

export const getContentType = () => ({
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': '69420'
})
