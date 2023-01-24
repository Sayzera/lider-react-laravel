import React from 'react'
import Durumlar from '../../components/AraNakliye/SevkiyatDurumlari'
import { useAuth } from 'src/hooks/auth'
const Dashboard = () => {
  const { user } = useAuth()
  const userData = user()
  const [openModal, setOpenModal] = React.useState(false)

  return (
    <>
      <div className="my-4">
        <p className="text-xl">Hoşgeldiniz {userData.name} </p>
      </div>
      <Durumlar setModalOpen={setOpenModal} />
    </>
  )
}

export default Dashboard
