import { Notify } from 'quasar'

export function Notificacion (mensaje, color) {
  Notify.create({
    message: mensaje,
    color: color
  })
}
