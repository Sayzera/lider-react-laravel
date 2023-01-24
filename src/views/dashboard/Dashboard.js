import Cookies from 'js-cookie'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/hooks/auth'
const Dashboard = () => {
  const { isAuthenticated, user } = useAuth()

  const userData = user()
  const navigate = useNavigate()
  React.useEffect(() => {
    if (userData?.type == 999) {
      navigate('/admin/dashboard')
    } else if (userData?.type == 0) {
      navigate('/user/dashboard')
    } else if (userData?.type == 1) {
      navigate('/araNakliyeci/dashboard')
    } else if (userData?.type == 3) {
      navigate('/depocu/dashboard')
    } else if (userData?.type == 2) {
      navigate('/nakliyeci/dashboard')
    }
  }, [])

  return (
    <>
      <div className="flex justify-center items-center h-screen-100">Yükleniyor..</div>
    </>
  )
}

export default Dashboard
