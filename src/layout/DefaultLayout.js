import Cookies from 'js-cookie'
import React from 'react'
import { useAuth } from 'src/hooks/auth'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  const { isAuthenticated, user } = useAuth()

  React.useEffect(() => {
    isAuthenticated()
  }, [])

  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <AppContent />
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default DefaultLayout
