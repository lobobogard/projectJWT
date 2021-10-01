import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { SessionStorage } from 'quasar'

const token = SessionStorage.getItem('token')

const apiToken = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = apiToken
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { apiToken }
