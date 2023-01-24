import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Durumlar from 'src/components/Admin/Durumlar'
import {
  kargoCounts,
  kargoSayilari,
  kargolar,
  siparisler,
  selectMessage,
} from 'src/redux/admin/siparisIslemleriSlice'
import { Link, useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import SiparisIslemleriBtn from 'src/components/Admin/SiparisIslemleriBtn'
import Modal from 'src/components/Admin/siparisBilgileriModal'
import KargoIslemleriModal from 'src/components/Admin/KargoIslemleriModal'
import useScroll from 'src/hooks/useScroll'
import SevkiyatDurumlari from './SevkiyatDurumlari'
import SevkiyatDurumlariModal from 'src/components/Admin/SevkiyatDurumlari/Durumlar'
import { AdminChart } from 'src/components/Admin/Chart'

import { chartActions } from 'src/redux/chart/chartSlice'
import { CChart } from '@coreui/react-chartjs'
import LineChart from 'src/components/Admin/Chart/lineChart'
import { useAuth } from 'src/hooks/auth'
const Dashboard = () => {
  const { selectAdminChartData, fetchAdminChartData } = chartActions

  const adminChartData = useSelector(selectAdminChartData)

  console.log('adminChartData', adminChartData)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const kargoSayisi = useSelector(kargoCounts)
  const kargoDatalari = useSelector(siparisler)
  const selectMessageState = useSelector(selectMessage)

  const [openIslemModal, setOpenIslemModal] = useState(false)
  const [kargoIslemleriUpdateId, setKargoIslemleriUpdateId] = useState(null)
  const [kargoBilgisiState, setKargoBilgisiState] = useState([])

  const [openModal, setOpenModal] = useState(false)

  const [executeScroll, elref] = useScroll()

  const { typeControl } = useAuth()
  React.useEffect(() => {
    typeControl('999')
    dispatch(fetchAdminChartData())
    executeScroll()

    dispatch(kargoSayilari())
    dispatch(
      kargolar({
        kargoStatus: 1,
      }),
    )
  }, [selectMessageState])

  const columns = [
    {
      name: 'Müşteri Bilgisi',
      selector: (row) => row.kullanici_adi,
      sortable: true,
    },
    {
      name: 'Kargo Bilgileri',
      wrap: true,
      width: '300px',

      selector: (row) => {
        return (
          <div className="py-2">
            <Link to={`#kargoBilgileriModal`}>
              <button
                onClick={() => {
                  setOpenModal(true)
                  setKargoBilgisiState(row)
                  executeScroll()
                  setOpenIslemModal(false)
                }}
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                Kargo Bilgilerini Görüntüle
              </button>
            </Link>
          </div>
        )
      },
    },

    {
      name: 'Teklif',
      sortable: true,
      selector: (row) => (
        <div>
          <p className="mb-2">Tarih: {row.sevk_tarihi} </p>
          <p className="mb-2" title="Teklif Edilen Tutar">
            T. Edilen Tutar: {row.teslimat_ucreti}
          </p>
          <p>Para Birimi : {row.teslimat_para_birimi}</p>
        </div>
      ),
    },
    {
      name: 'İşlemler',
      wrap: true,
      width: '300px',
      selector: (row) => (
        <SiparisIslemleriBtn
          row={row}
          setOpenIslemModal={setOpenIslemModal}
          setKargoIslemleriUpdateId={setKargoIslemleriUpdateId}
          _executeScroll={executeScroll}
        />
      ),
    },
  ]

  const data = [
    {
      className: 'mb-4',
      color: 'info',
      value: (item) => (
        <div
          onClick={() => {
            dispatch(kargolar({ kargoStatus: 1 }))
            setOpenModal(false)
            navigate('/admin/kargo-durumlari/1')
            setOpenIslemModal(false)
          }}
        >
          <div className="h-16 text-xl">Bekleyen Kargolar ({kargoSayisi.bekleyenKargolar})</div>

          <button>
            <span className="text-xl">{item.linkTitle}</span>
          </button>
        </div>
      ),
      sm: 6,
      lg: 4,
      title: 'Users',
      link: '#',
      linkTitle: 'Kargoları Getir',
    },

    {
      className: 'mb-4',
      color: 'success',
      value: (item) => (
        <div
          onClick={() => {
            dispatch(kargolar({ kargoStatus: 2 }))
            setOpenModal(false)
            navigate('/admin/kargo-durumlari/2')
            setOpenIslemModal(false)
          }}
        >
          <div className="h-16 text-xl">
            Onaylanan Kargolar ({kargoSayisi.onayBekleyenKargolar})
          </div>

          <button>
            <span className="text-xl">{item.linkTitle}</span>
          </button>
        </div>
      ),
      sm: 6,
      lg: 4,
      title: 'Users',
      link: '#',
      linkTitle: 'Kargoları Getir',
    },

    {
      className: 'mb-4',
      color: 'danger',
      value: (item) => (
        <div
          onClick={() => {
            dispatch(kargolar({ kargoStatus: 3 }))
            setOpenModal(false)
            navigate('/admin/kargo-durumlari/3')
            setOpenIslemModal(false)
          }}
        >
          <div>
            <div className="h-16 text-xl">
              İptal Edilen Kargolar ({kargoSayisi.iptalEdilenKargolar})
            </div>
          </div>

          <button>
            <span className="text-xl">{item.linkTitle}</span>
          </button>
        </div>
      ),
      sm: 6,
      lg: 4,
      title: 'Users',
      link: '#',
      linkTitle: 'Kargoları Getir',
    },
  ]

  return (
    <>
      <Durumlar data={data} />
      <SevkiyatDurumlariModal setModalOpen={() => console.log('work')} />
      <div className="md:flex md:flex-row  w-full items-center md:space-x-12 justify-center mt-3 border-t  border-gray-500 pt-3">
        <div className="w-full md:w-1/4">
          <h1 className="text-center">Toplam Teslimat Ciroları</h1>
          <AdminChart chartData={adminChartData} />
        </div>
        <div className="w-full md:w-1/2">
          <LineChart chartData={adminChartData} />
        </div>
        <hr />
      </div>
    </>
  )
}

export default Dashboard
