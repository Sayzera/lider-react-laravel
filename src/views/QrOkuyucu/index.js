import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAuth } from 'src/hooks/auth'
import { qrOkut, selectMessage, setMessage } from 'src/redux/QrOkuyucu/qrOkuyucuSlice'

function QrOkuyucu() {
  const routes = useParams()
  const { user } = useAuth()
  const { barcode } = routes
  const userData = user()

  const dispatch = useDispatch()
  const message = useSelector(selectMessage)

  const [yetkilimi, setYetkilimi] = React.useState(true)

  React.useEffect(() => {
    if (userData?.type == 2 || userData?.type == 3) {
      // İşlemi yapabilir
      dispatch(
        qrOkut({
          user_id: userData.id,
          barcode: barcode,
          user_type: userData.type,
        }),
      )
    }
    if (userData?.type != 2 && userData?.type != 3) {
      // İşlemi yapamaz
      setYetkilimi(false)
    }
  }, [])

  if (yetkilimi == false) {
    return (
      <div className="w-full h-screen flex justify-center ">
        <div className="text-center">
          <p className="text-2xl">Bu sayfaya erişim yetkiniz bulunmamaktadır.</p>
        </div>
      </div>
    )
  }

  if (message) {
    return (
      <div className="w-full h-screen flex justify-center ">
        <div className="text-center">
          <p className="text-2xl text-green-500">{message}</p>
        </div>
      </div>
    )
  }
  return (
    <div className="w-full h-screen flex justify-center ">
      <div className="text-center">
        <p className="text-2xl">QR Okunuyor...</p>
        <p className="text-2xl">{barcode}</p>
      </div>
    </div>
  )
}

export default QrOkuyucu
