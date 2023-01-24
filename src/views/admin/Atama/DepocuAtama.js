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
import AtamaModal from 'src/components/Admin/AtamaIslemleri/Modal'
import { useAuth } from 'src/hooks/auth'
const Dashboard = () => {
  // Seçilen Kargo Bilgileri
  const [selectKargo, setSelectKargo] = useState([])
  const { typeControl } = useAuth()

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

  const params = useParams()

  // Atama Modal
  const [openAtamaModal, setOpenAtamaModal] = useState(false)

  const handleSelectedChange = (state) => {
    console.log('Selected Rows: ', state.selectedRows)
    setSelectKargo(state.selectedRows)
  }

  React.useEffect(() => {
    typeControl('999')
    executeScroll()

    dispatch(kargoSayilari())
    dispatch(
      kargolar({
        kargoStatus: 2,
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
      color: 'success',
      value: (item) => (
        <div>
          <div className="h-8 text-xl">
            Atama Bekleyen Kargolar ({kargoSayisi.onayBekleyenKargolar})
          </div>

          <button
            onClick={() => {
              dispatch(kargolar({ kargoStatus: 2 }))
              setOpenModal(false)
              navigate('/admin/dashboard')
              setOpenIslemModal(false)
            }}
          >
            <span className="text-xl">{item.linkTitle}</span>
          </button>
        </div>
      ),
      sm: 12,
      lg: 12,
      title: 'Users',
      link: '#',
    },
  ]

  return (
    <>
      <AtamaModal open={openAtamaModal} setOpen={setOpenAtamaModal} title="Depocu Atama">
        <div>Hi</div>
      </AtamaModal>

      <Durumlar data={data} />
      <div>
        {selectMessageState != null && (
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

        {selectKargo.length > 0 && (
          <div className="relative">
            <button
              style={{
                backgroundColor: '#4c51bf',
                padding: '10px 20px',
                marginLeft: 15,
              }}
              className=" bg-amber-500 text-white active:bg-amber-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                setOpenAtamaModal(true)
              }}
            >
              <i className="fas fa-truck"></i> Seçilen {selectKargo.length} Kargoyu Ata
            </button>
          </div>
        )}

        <DataTable
          title={params.title}
          selectableRows={true}
          selectableRowsHighlight={true}
          onSelectedRowsChange={handleSelectedChange}
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
