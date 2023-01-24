import React from 'react'
import SevkiyatDurumlar from 'src/components/AraNakliye/SevkiyatDurumlari'
import SevkiyatBtn from 'src/components/AraNakliye/SevkiyatBtn'
import DataTable from 'react-data-table-component'
import SiparisModal from 'src/components/User/Modals/SiparisModal'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useScroll from 'src/hooks/useScroll'
import { useParams } from 'react-router-dom'
import {
  sevkiyatlar,
  loading,
  getSevkiyatlar,
  sevkiyat_sayilarini_cek,
} from 'src/redux/araNakliye/sevkiyatDurumlariSlice'
import { SelectMessage, SelectFarkMessage } from 'src/redux/araNakliye/sevkiyatAktarimlariSlice'

function SevkiyatIslemleri() {
  const [executeScroll, elref] = useScroll()
  const { durum } = useParams()
  const dispatch = useDispatch()
  const sevkiyatlarim = useSelector(sevkiyatlar)
  const isLoading = useSelector(loading)
  const [kargoDurum, setKargoDurum] = React.useState('Bekleyen Sevkiyatlar')
  const [openModal, setOpenModal] = React.useState(false)
  const [rowData, setRowData] = React.useState([])
  const mesaj = useSelector(SelectMessage)
  const farkMesaj = useSelector(SelectFarkMessage)
  const navigate = useNavigate()
  const ModalVeriler = (gelenRow) => {
    setOpenModal(true)
    setRowData(gelenRow)
  }

  const columns = [
    {
      name: 'Kargo Bilgileri',
      wrap: true,
      width: '250px',
      selector: (row) => {
        return (
          <div>
            <button
              onClick={() => {
                ModalVeriler(row)
                executeScroll()
              }}
              className="border p-2 rounded-lg bg-gray-300"
              style={{
                cursor: 'pointer',
              }}
            >
              Kargo Bilgilerini Görüntüle
            </button>
          </div>
        )
      },
    },
    {
      name: 'Alınacak Kişi / Firma',
      wrap: true,
      width: '200px',
      selector: (row) => (
        <div>
          <p className="mb-2">{row.kullanici_adi} </p>
        </div>
      ),
    },

    {
      name: 'Sevk Tarihi',
      wrap: true,
      width: '150px',
      selector: (row) => (
        <div>
          <p className="mb-2">{row.sevk_tarihi} </p>
        </div>
      ),
    },
    {
      name: 'Tahmini Teslim Tarihi',
      wrap: true,
      width: '200px',
      selector: (row) => (
        <div>
          <p className="mb-2">{row.tahmini_teslim_tarihi} </p>
        </div>
      ),
    },
    {
      name: 'İşlemler',
      wrap: true,
      width: '300px',
      selector: (row) => <SevkiyatBtn row={row} />,
    },
  ]

  React.useEffect(() => {
    executeScroll()
    if (durum && durum != 1 && durum != 2) {
      navigate('/araNakliyeci/dashboard')
    }

    if (durum && durum == 1) {
      setKargoDurum('Devam Eden Sevkiyatlarım')
    } else if (durum == 2) {
      setKargoDurum('Tamamlanan Sevkiyatlarım')
    }

    dispatch(
      getSevkiyatlar({
        sevkiyatStatus: durum,
      }),
    )
  }, [durum, mesaj, farkMesaj])

  return (
    <>
      <SevkiyatDurumlar setModalOpen={setOpenModal} />
      <div>
        <SiparisModal
          modalOpen={openModal}
          setModalOpen={setOpenModal}
          data={rowData}
          elref={elref}
        />

        <DataTable
          title={kargoDurum}
          selectableRows={false}
          selectableRowsHighlight={true}
          onSelectedRowsChange={(rows) => console.log(rows)}
          columns={columns}
          data={sevkiyatlarim.data}
          progressPending={isLoading}
          pagination
          paginationServer
          key={1}
          paginationTotalRows="10"
        />
      </div>
    </>
  )
}

export default SevkiyatIslemleri
