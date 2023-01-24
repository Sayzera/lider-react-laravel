import React from 'react'
import { useParams } from 'react-router-dom'
import Durumlar from 'src/components/User/SevkiyatDurumlari'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useScroll from 'src/hooks/useScroll'
import { sevkiyatlar, loading, getSevkiyatlar } from 'src/redux/user/sevkiyat_islemleri'
import DataTable from 'react-data-table-component'
import SiparisModal from 'src/components/User/Modals/SiparisModal'
import SevkiyatBtn from 'src/components/User/SevkiyatBtn'

function SevkiyatDurumlari() {
  const [executeScroll, elref] = useScroll()
  const { durum } = useParams()
  const dispatch = useDispatch()
  const sevkiyatlarim = useSelector(sevkiyatlar)
  const isLoading = useSelector(loading)
  const [kargoDurum, setKargoDurum] = React.useState('Bekleyen Sevkiyatlar')
  const [openModal, setOpenModal] = React.useState(false)
  const [rowData, setRowData] = React.useState([])
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
      name: 'İsim',
      wrap: true,
      width: '200px',
      selector: (row) => (
        <div>
          <p className="mb-2">{row.teslim_alacak_kisi} </p>
        </div>
      ),
    },
    // {
    //   name: 'Sevk Tarihi',
    //   wrap: true,
    //   width: '150px',
    //   selector: (row) => (
    //     <div>
    //       <p className="mb-2">{row.sevk_tarihi} </p>
    //     </div>
    //   ),
    // },
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
      name: 'Sevk Ücreti',
      wrap: true,
      width: '150px',
      selector: (row) => (
        <div>
          <p className="mb-2" title="Teklif Edilen Tutar">
            {row.teslimat_ucreti} {row.teslimat_para_birimi}
          </p>
        </div>
      ),
    },
    {
      name: 'Durum',
      wrap: true,
      width: '300px',
      selector: (row) => <SevkiyatBtn row={row} />,
    },
  ]

  React.useEffect(() => {
    executeScroll()
    if (durum && durum != 1 && durum != 2 && durum != 3) {
      navigate('/user/dashboard')
    }

    if (durum && durum == 1) {
      setKargoDurum('Bekleyen Sevkiyatlarım')
    } else if (durum == 2) {
      setKargoDurum('Devam Eden Sevkiyatlarım')
    } else if (durum == 3) {
      setKargoDurum('Tamamlanan Sevkiyatlarım')
    }

    dispatch(
      getSevkiyatlar({
        sevkiyatStatus: durum,
      }),
    )
  }, [durum])

  console.log('sevkiyatlar==>', sevkiyatlarim)
  return (
    <>
      <Durumlar setModalOpen={setOpenModal} />

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

export default SevkiyatDurumlari
