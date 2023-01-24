import React, { useState } from 'react'
import Durumlar from 'src/components/User/Durumlar'
import SevkiyatDurumlar from 'src/components/User/SevkiyatDurumlari'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from 'src/hooks/auth'
const Dashboard = () => {
  const { user } = useAuth()
  const userData = user()
  const [openModal, setOpenModal] = React.useState(false)

  return (
    <>
      <div className="my-4">
        <p className="text-xl">Hoşgeldiniz {userData.name}</p>
      </div>
      <Durumlar setModalOpen={setOpenModal} />
      <SevkiyatDurumlar setModalOpen={setOpenModal} />
    </>
  )
}

export default Dashboard
