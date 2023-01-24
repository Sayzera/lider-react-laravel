import React from 'react'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  aktarimSonuc,
  urunleriAl,
  farklari_kabul_et,
  depoya_aktar,
  SelectMessage,
  setMessage,
  setFarkMessage,
  SelectFarkMessage,
} from 'src/redux/araNakliye/sevkiyatAktarimlariSlice'

function SevkiyatBtn({ row }) {
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch()
  const sevkiyatSonuc = useSelector(aktarimSonuc)
  const message = useSelector(SelectMessage)
  const farkMessage = useSelector(SelectFarkMessage)

  React.useEffect(() => {
    if (message == 'urunalindi') {
      if (sevkiyatSonuc?.success == 1) {
        Swal.fire(`${sevkiyatSonuc.message}`)
      } else {
        Swal.fire({
          title: `${sevkiyatSonuc.message}`,
          showCancelButton: true,
          cancelButtonText: 'Kapat',
          confirmButtonText: 'Onayla',
          preConfirm: () => {
            farklariOnayla(sevkiyatSonuc.alinan_parca_sayisi, sevkiyatSonuc.payment_number)
          },
        })
      }
    } else if (message == 'depoyaaktarildi') {
      if (sevkiyatSonuc?.success == 1) {
        Swal.fire(`${sevkiyatSonuc.message}`)
      } else {
        Swal.fire('İşleminiz Sırasında Bir Hata Oluştu, Lütfen Tekrar Deneyiniz')
      }
    }

    if (farkMessage == 'farkonaylandi') {
      if (sevkiyatSonuc?.success == 1) {
        Swal.fire(`${sevkiyatSonuc.message}`)
      } else {
        Swal.fire('İşleminiz Sırasında Bir Hata Oluştu, Lütfen Tekrar Deneyiniz')
      }
    }

    dispatch(setMessage())
    dispatch(setFarkMessage())
    dispatch(setMessage())
  }, [message, farkMessage])

  function farklariOnayla(parcaSayisi, paymentNumber) {
    dispatch(farklari_kabul_et({ parcaSayisi, paymentNumber }))
  }

  function sevkiyatOnayla(parcaSayisi, paymentNumber) {
    dispatch(urunleriAl({ parcaSayisi, paymentNumber }))
  }

  function depoyaAktar(paymentNumber) {
    dispatch(depoya_aktar({ paymentNumber }))
  }

  if (row.siparis_durumu == 0) {
    return (
      <div>
        <button
          className="btn btn-primary btn-sm mr-4"
          onClick={() => {
            const { value: parcaSayisi } = Swal.fire({
              title: 'Ürünleri Teslim Alacaksınız!',
              input: 'text',
              inputLabel: 'Aldığınız Toplam Parça Sayısı',
              showCancelButton: true,
              cancelButtonText: 'Kapat',
              inputValidator: (value) => {
                if (!value) {
                  return 'Aldığınız Toplam Parça Sayısını Girmeniz Zorunludur!'
                }
              },
              confirmButtonText: 'Onayla',
              preConfirm: (parcaSayisi) => {
                sevkiyatOnayla(parcaSayisi, row.payment_number)
              },
            })

            if (parcaSayisi) {
              Swal.fire(`Toplam Alınan Parça Sayısı :  ${parcaSayisi}`)
            }
          }}
        >
          Ürünleri Al
        </button>
      </div>
    )
  } else if (row.siparis_durumu == 1) {
    return (
      <div>
        <button
          className="btn btn-success btn-sm"
          onClick={() => {
            depoyaAktar(row.payment_number)
          }}
        >
          Depoya Teslim Et
        </button>
      </div>
    )
  } else {
    return (
      <div className="bg-green-500 p-2 text-white text-bold">
        <span>Sevkiyat İşlemi Tamamlandı.</span>
      </div>
    )
  }
}

export default SevkiyatBtn
SevkiyatBtn.propTypes = {
  row: PropTypes.object,
}
