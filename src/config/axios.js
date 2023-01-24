import Axios from 'axios'
import Cookies from 'js-cookie'

export default Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // Siteler arası çerez erişimine izin vermek için
  withCredentials: true,
})
