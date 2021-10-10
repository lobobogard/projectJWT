import { Notificacion } from './notification.js'

export default function () {
  const catchError = (err) => {
    console.log(err.response.data)
    if (err.response.status === 400) {
      if (err.response.data.error) {
        Notificacion(err.response.data.error, 'red-10')
      } else {
        Notificacion(err.response.data, 'red-10')
      }
    }

    if (err.response.status === 401) {
      Notificacion(err.response.data.Mensaje, 'red-10')
    }

    if (err.response.status !== 401 && err.response.status !== 400) {
      Notificacion('Server error communicating with support', 'red-10')
    }
  }
  return { catchError }
}
