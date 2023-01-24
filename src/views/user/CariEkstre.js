import React, { useRef, useState } from 'react'
import Durumlar from 'src/components/User/Durumlar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/hooks/auth'

import language from 'src/config/keywords'
import DataTable from 'react-data-table-component'
import CariEkstresiDurumlar from 'src/components/User/CariEkstersiDurumlar'
import {
  cariEkstre,
  selectCariEkstresi,
  selectIsStokDetay,
  selectLoading,
} from 'src/redux/user/cariEkstreSlice'
import { CFormInput, CFormLabel, CFormText } from '@coreui/react'

import ReactToPrint from 'react-to-print'
import { cilPrint } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

function Kargolarim() {
  const dataTableRef = useRef()

  const { user } = useAuth()
  const userData = user()
  const dispatch = useDispatch()
  const lang = language['tr']
  const [rowData, setRowData] = React.useState([])

  const navigate = useNavigate()

  // Cari Ektresi
  const cariEkstresi = useSelector(selectCariEkstresi)
  const isStokDetay = useSelector(selectIsStokDetay)
  const loadingEkstreData = useSelector(selectLoading)

  const [baslangicTarihi, setBaslangicTarihi] = useState(new Date().toISOString().slice(0, 10))
  const [bitisTarihi, setBitisTarihi] = useState(new Date().toISOString().slice(0, 10))

  React.useEffect(() => {
    dispatch(
      cariEkstre({
        cari_kodu: userData.cari_code,
        stok_detay: isStokDetay,
        ilkTarih: baslangicTarihi,
        sonTarih: bitisTarihi,
      }),
    )
  }, [isStokDetay])

  const detaysiz = [
    {
      name: 'Tarih',
      wrap: true,
      selector: (row) => <div>{row.tarih}</div>,
    },
    {
      name: 'Evrak Seri',
      wrap: true,
      selector: (row) => <div>{row.evrakseri}</div>,
    },

    {
      name: 'Evrak Sıra',
      wrap: true,
      selector: (row) => <div>{row.evraksira}</div>,
    },

    {
      name: 'Evrak Tipi',
      wrap: true,
      selector: (row) => <div>{row.evraktipi}</div>,
    },
    {
      name: 'Cari Borç',
      wrap: true,
      selector: (row) => <div>{row.cariborc}</div>,
    },
    {
      name: 'Cari Alacak',
      wrap: true,
      selector: (row) => <div>{row.carialacak}</div>,
    },
    {
      name: 'Cari Bakiye',
      wrap: true,
      selector: (row) => <div>{row.caribakiye}</div>,
    },
    {
      name: 'Vade Tarihi',
      wrap: true,
      selector: (row) => <div>{row.vadetarihi}</div>,
    },
    {
      name: 'Kalan Gün',
      wrap: true,
      selector: (row) => <div>{row.vadegun}</div>,
    },
  ]

  const detayli = [
    {
      name: 'Tarih',
      wrap: true,
      selector: (row) => <div>{row.tarih}</div>,
    },
    {
      name: 'Evrak No',
      wrap: true,
      selector: (row) => <div>{row.Evrak_No}</div>,
    },
    {
      name: 'Aciklama',
      wrap: true,
      selector: (row) => <div>{row.Aciklama}</div>,
    },
    {
      name: 'Stok Kodu',
      wrap: true,
      selector: (row) => <div>{row.Stok_Kodu}</div>,
    },
    {
      name: 'Stok İsmi',
      wrap: true,
      selector: (row) => <div>{row.Stok_Ismi}</div>,
    },
    {
      name: 'Miktar',
      wrap: true,
      selector: (row) => <div>{row.Miktar}</div>,
    },
    {
      name: 'Birim Fiyat',
      wrap: true,
      selector: (row) => <div>{row.Birim_Fiyat}</div>,
    },
    {
      name: 'Vade Tarihi',
      wrap: true,
      selector: (row) => <div>{row.Vade_Tarihi}</div>,
    },
    {
      name: 'Orj. Doviz Bakiye',
      wrap: true,
      selector: (row) => <div>{row.Orj_Doviz_Bakiye}</div>,
    },
    {
      name: 'Doviz Birimi',
      wrap: true,
      selector: (row) => <div>{row.Doviz_Ismi}</div>,
    },
  ]

  return (
    <>
      <div className="md:flex  md:space-x-2">
        <div className="w-full md:w-1/2">
          <CFormLabel htmlFor="nf-email">Başlangıç Tarihi</CFormLabel>
          <CFormInput
            type="date"
            onChange={(e) => setBaslangicTarihi(e.target.value)}
            id="nf-email"
            name="nf-email"
            placeholder="Enter Email.."
            autoComplete="email"
            defaultValue={new Date().toISOString().slice(0, 10)}
          />
        </div>

        <div className="w:full md:w-1/2 mb-3">
          <CFormLabel htmlFor="nf-email">Bitiş Tarihi</CFormLabel>
          <CFormInput
            onChange={(e) => setBitisTarihi(e.target.value)}
            type="date"
            id="nf-email"
            name="nf-email"
            placeholder="Enter Email.."
            autoComplete="email"
            defaultValue={new Date().toISOString().slice(0, 10)}
          />
        </div>
      </div>
      <CariEkstresiDurumlar
        baslangicTarihi={baslangicTarihi}
        bitisTarihi={bitisTarihi}
        cariKodu={userData.cari_code}
        cariDataCount={cariEkstresi?.cari?.length}
      />

      <div className="flex justify-end mb-2">
        <ReactToPrint
          trigger={() => (
            <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row' }}>
              <CIcon icon={cilPrint} customClassName="nav-icon" width={25} />
              <span style={{ cursor: 'pointer', marginLeft: '3px' }}>Yazdır</span>
            </div>
          )}
          content={() => dataTableRef.current}
        />
      </div>
      <div ref={dataTableRef}>
        <DataTable
          title={'Cari Ekstre'}
          selectableRows={false}
          selectableRowsHighlight={true}
          onSelectedRowsChange={(rows) => console.log(rows)}
          columns={isStokDetay == true ? detayli : detaysiz}
          data={cariEkstresi?.cari}
          progressPending={loadingEkstreData}
          pagination
          paginationServer
          paginationTotalRows={cariEkstresi?.cari?.length}
          paginationPerPage={200}
          keyField="id"
        />
      </div>
    </>
  )
}

export default Kargolarim
