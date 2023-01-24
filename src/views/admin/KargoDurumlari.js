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
import { Link, useNavigate, useParams } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import SiparisIslemleriBtn from 'src/components/Admin/SiparisIslemleriBtn'
import Modal from 'src/components/Admin/siparisBilgileriModal'
import KargoIslemleriModal from 'src/components/Admin/KargoIslemleriModal'
import useScroll from 'src/hooks/useScroll'
import { useAuth } from 'src/hooks/auth'

const Dashboard = () => {
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

  const route = useParams()

  const kargoDurumId = route.id ?? 1

  const { typeControl } = useAuth()
  React.useEffect(() => {
    typeControl('999')
    executeScroll()

    dispatch(kargoSayilari())
    dispatch(
      kargolar({
        kargoStatus: kargoDurumId,
      }),
    )

    console.log('kargo sayisi', kargoSayisi)
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
      <div>
        {selectMessageState && (
          <div ref={elref}>
            <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-emerald-500">
              <span className="text-xl inline-block mr-5 align-middle">
                <i className="fas fa-bell"></i>
              </span>
              <span className="ml-2 inline-block align-middle mr-8">{selectMessageState}</span>
            </div>
          </div>
        )}
        <KargoIslemleriModal
          modalOpen={openIslemModal}
          setModalOpen={setOpenIslemModal}
          data={kargoBilgisiState}
          kargoIslemleriUpdateId={kargoIslemleriUpdateId}
          kargoBilgileriKapat={setOpenModal}
          _executeScroll={executeScroll}
          _kargoRef={elref}
        />

        <Modal
          modalOpen={openModal}
          setModalOpen={setOpenModal}
          data={kargoBilgisiState}
          _kargoRef={elref}
        />

        <DataTable
          title={kargoDatalari.message}
          selectableRowsHighlight={true}
          onSelectedRowsChange={(rows) => {
            return rows
          }}
          columns={columns}
          data={kargoDatalari.data}
          pagination
          paginationServer
          key={data.id}
          paginationTotalRows={kargoDatalari.data?.length}
        />
      </div>
    </>
  )
}

export default Dashboard
