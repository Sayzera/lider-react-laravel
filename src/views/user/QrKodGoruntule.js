import React, { useRef } from 'react'
import { kBilgileri, kargo_bilgileri_getir } from 'src/redux/user/kargo_islemleri'
import { useDispatch, useSelector } from 'react-redux'
import QRCode from 'react-qr-code'
import DataTable from 'react-data-table-component'
import ReactToPrint from 'react-to-print'
import { useParams } from 'react-router-dom'
import { cilPrint } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

function QrKodGoruntule() {
  const { paymentNumber } = useParams()
  const dispatch = useDispatch()
  const kargoBilgileri = useSelector(kBilgileri)
  const dataTableRef = useRef()
  const columns = [
    {
      name: '#',
      selector: (row, index) => (
        <div>
          <p className="mb-2">{index + 1} . Parça </p>
        </div>
      ),
    },
    {
      name: 'Barkod',
      selector: (row) => (
        <div>
          <p className="mb-2">{row.barcode} </p>
        </div>
      ),
    },

    {
      name: 'QR Kod',
      selector: (row) => (
        <div
          style={{
            height: 'auto',
            paddingTop: '15px',
            paddingBottom: '15px',
            maxWidth: 128,
            width: '100%',
          }}
        >
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={`http://lider-demo.testb2b.site/` + row.barcode}
            viewBox={`0 0 256 256`}
          />
        </div>
      ),
    },
  ]

  React.useEffect(() => {
    dispatch(kargo_bilgileri_getir(paymentNumber))
  }, [])

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '15px',
        }}
      >
        <h2 style={{ fontSize: '30px' }}>QR Kodları</h2>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '15px',
          paddingRight: '30px',
        }}
      >
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
          noHeader
          selectableRows={false}
          selectableRowsHighlight={true}
          onSelectedRowsChange={(rows) => console.log(rows)}
          columns={columns}
          data={kargoBilgileri}
          progressPending={false}
          pagination={false}
          paginationServer
          key={1}
          paginationTotalRows="10"
        />
      </div>
    </>
  )
}

export default QrKodGoruntule
