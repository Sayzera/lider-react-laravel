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
import Modal from 'src/components/Admin/siparisBilgileriModal'
import useScroll from 'src/hooks/useScroll'
import {
  depodakiPaketlereNotEkle,
  fetchDepodakiKargolar,
  kargodakiPaketleriGetir,
  paketlerdekiBarkodlarOkundumu,
  SelectDepodakiKargolar,
  SelectKargodakiPaketler,
  SelectMessage,
  setMessage,
  tiraYukle,
} from 'src/redux/depocu/depocuSlice'
import DepocuModal from 'src/components/Depocu/Modal'
import { CFormInput } from '@coreui/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Cookies from 'js-cookie'

const MySwal = withReactContent(Swal)

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selectMessageState = useSelector(selectMessage)
  const depodakiKargolar = useSelector(SelectDepodakiKargolar)
  const kargodakiPaketler = useSelector(SelectKargodakiPaketler)
  const [openIslemModal, setOpenIslemModal] = useState(false)
  const [kargoBilgisiState, setKargoBilgisiState] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [executeScroll, elref] = useScroll()
  const [forms, setForms] = useState({})

  const message = useSelector(SelectMessage)

  const user = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).user : null

  const inputHandler = (e) => {
    setForms({ ...forms, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    let arr = []
    Object.keys(forms).map((key) => {
      arr.push({ name: key, value: forms[key] })
    })

    dispatch(depodakiPaketlereNotEkle(arr))
  }

  React.useEffect(() => {
    console.log('work')
    executeScroll()

    dispatch(fetchDepodakiKargolar())

    console.log('Kargodaki Paketler', kargodakiPaketler)

    if (message) {
      MySwal.fire({
        title: <p>{message}</p>,
        icon: 'info',
        confirmButtonText: 'Tamam',
      })
      dispatch(setMessage(null))
      setOpen(false)
    }
  }, [kargodakiPaketler, message])

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
      name: 'QR Kod',
      sortable: true,
      width: '250px',
      selector: (row) => (
        <Link to={`/depocu/qrkod-goruntule/` + row?.payment_number}>
          <button
            className="bg-blue-600  hover:bg-blue-800 text-white font-bold p-2 px-4 rounded"
            style={{
              border: '1px solid #e2e8f0',
            }}
          >
            QR Kodları Görüntüle
          </button>
        </Link>
      ),
    },
    {
      name: 'İşlemler',
      wrap: true,
      width: '400px',
      selector: (row) => (
        <div className="flex flex-row">
          <div
            onClick={() => {
              setOpen(true)
              dispatch(
                kargodakiPaketleriGetir({
                  payment_number: row.payment_number,
                }),
              )
            }}
            className="bg-emerald-500 text-center text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            <p>Paketler Nerede</p>
          </div>
          <div
            onClick={() => {
              if (row.tira_yuklenebilirmi == 0) {
                dispatch(
                  paketlerdekiBarkodlarOkundumu({
                    payment_number: row.payment_number,
                    user_type: user?.type,
                  }),
                )
              } else {
                MySwal.fire({
                  title: 'Bu kargoyu tıra yüklemek istediğinize emin misiniz ?',
                  showCancelButton: true,
                  confirmButtonText: 'Yükle',
                  cancelButtonText: 'İptal',
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    dispatch(
                      tiraYukle({
                        payment_number: row.payment_number,
                      }),
                    )
                  }
                })
              }
            }}
            className="bg-emerald-500 text-center text-white active:bg-emerald-600 font-bold  text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            {row.tira_yuklenebilirmi == 0 ? <p>Tıra yüklemek için hazırla</p> : <p>Tıra Yükle</p>}
          </div>
        </div>
      ),
    },
  ]

  const data = [
    {
      className: 'mb-4',
      color: 'info',
      value: (item) => (
        <div>
          <div className="h-16 text-xl">Depodaki Kargolar ({depodakiKargolar.length})</div>

          <button
            onClick={() => {
              dispatch(kargolar({ kargoStatus: 1 }))
              setOpenModal(false)
              navigate('/admin/kargo-durumlari/1')
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

  const [open, setOpen] = useState(false)

  return (
    <>
      <DepocuModal open={open} setOpen={setOpen} title="Paketler Nerde">
        <div className="px-2 ">
          <p className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
            <span className="font-bold">Toplam Parça Sayısı :</span> {kargodakiPaketler.length}
          </p>
          {kargodakiPaketler?.map((item) => (
            <p
              key={item.id}
              className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              <label>Barcode:{item.barcode}</label>
              <br />
              <label>Tarih:{item.updated_date}</label>
              <textarea
                onChange={(e) => inputHandler(e)}
                className="form-control"
                name={item.barcode}
                value={forms[item.barcode]}
              >
                {item.kargom_nerede}
              </textarea>
            </p>
          ))}

          <button
            onClick={handleSubmit}
            className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            Kaydet
          </button>
        </div>
      </DepocuModal>
      <Durumlar data={data} />
      <div>
        {message && (
          <div ref={elref}>
            <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-emerald-500">
              <span className="text-xl inline-block mr-5 align-middle">
                <i className="fas fa-bell"></i>
              </span>
              <span className="ml-2 inline-block align-middle mr-8">{selectMessageState}</span>
            </div>
          </div>
        )}

        <Modal
          modalOpen={openModal}
          setModalOpen={setOpenModal}
          data={kargoBilgisiState}
          _kargoRef={elref}
        />

        <DataTable
          title={'Depodaki Kargolar'}
          selectableRowsHighlight={true}
          onSelectedRowsChange={(rows) => {
            return rows
          }}
          columns={columns}
          data={depodakiKargolar}
          pagination
          paginationServer
          key={data.id}
          paginationTotalRows={depodakiKargolar.length}
        />
      </div>
    </>
  )
}

export default Dashboard
