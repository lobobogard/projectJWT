import { Notificacion } from './notification.js'

export default function () {
  const catchError = (err) => {
    if (err.response.status === 400) {
      Notificacion(err.response.data.error, 'red-10')
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
