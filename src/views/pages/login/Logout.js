import React from 'react'
import { useAuth } from 'src/hooks/auth'

export default function CikisYap() {
  const { logout } = useAuth()

  React.useEffect(() => {
    logout()
  })
  return <div>Logout</div>
}
