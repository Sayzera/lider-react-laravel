import Cookies from 'js-cookie'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'src/config/axios'
export function useAuth() {
  const navigate = useNavigate()

  const login = (email, password, setError) => {
    axios
      .get('/sanctum/csrf-cookie')
      .then((response) => {
        axios
          .post('/api/login', {
            email,
            password,
          })
          .then((response) => {
            Cookies.set('auth', JSON.stringify(response.data))
            console.log(response.data.user)

            if (response.data.user.type == 999) {
              navigate('/admin/dashboard')
            } else if (response.data.user.type == 0) {
              navigate('/user/dashboard')
            } else if (response.data.user.type == 1) {
              navigate('/araNakliyeci/dashboard')
            } else if (response.data.user.type == 3) {
              navigate('/depocu/dashboard')
            } else if (response.data.user.type == 2) {
              navigate('/nakliyeci/dashboard')
            }
          })
          .catch((error) => {
            setError(error.response.data.message)
          })
      })
      .catch((error) => {
        // handle network error
        if (error.message == 'Network Error') {
          setError('Server kapalı veya bağlantı yok')
        }
      })
  }

  const logout = () => {
    axios
      .get('/api/logout')
      .then((response) => {
        Cookies.remove('auth')
        navigate('/user/login')
      })
      .catch((error) => {
        console.log(error)
        Cookies.remove('auth')
        navigate('/user/login')
      })
  }

  const isAuthenticated = () => {
    axios
      .post('/api/user')
      .then((response) => {})
      .catch((error) => {
        console.log(error)
        navigate('/user/login')
        Cookies.remove('auth')
      })
  }

  const typeControl = (izinverilenType) => {
    let user = JSON.parse(Cookies.get('auth')).user ?? null

    if (izinverilenType != user.type) {
      logout()
    }
  }

  const user = () => {
    if (Cookies.get('auth')) {
      return JSON.parse(Cookies.get('auth')).user ?? null
    } else {
      return null
    }
  }

  return {
    login,
    logout,
    isAuthenticated,
    user,
    typeControl,
  }
}
