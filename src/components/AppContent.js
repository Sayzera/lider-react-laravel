import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import { useAuth } from 'src/hooks/auth'

/**
 * QR Okuyucu
 */

const QrOkuyucu = React.lazy(() => import('../views/QrOkuyucu'))
const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'))

const AppContent = () => {
  const { user } = useAuth()
  const userData = user()?.type

  console.log(userData)

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.type == userData &&
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/" element={<Navigate to="dashboard" replace />} />

          <Route path="*" element={<Dashboard />} />

          <Route path="/qr-kod-okuyucu/:barcode" element={<QrOkuyucu />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
