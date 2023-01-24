import React from 'react'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  aktarimSonuc,
  teslim_et,
  SelectMessage,
  setMessage,
} from 'src/redux/nakliye/sevkiyatAktarimlariSlice'

import {
  SelectMessage as depocuSelectMessage,
  setMessage as depocuSetMessage,
} from 'src/redux/depocu/depocuSlice'

import Cookies from 'js-cookie'
import { paketlerdekiBarkodlarOkundumu } from 'src/redux/depocu/depocuSlice'

function SevkiyatBtn({ row }) {
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch()
  const sevkiyatSonuc = useSelector(aktarimSonuc)
  const message = useSelector(SelectMessage)

  // Barkodların hepsinin okunup okunmadığının mesajını almak için
  const depocuMessage = useSelector(depocuSelectMessage)

  const user = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).user : null

  React.useEffect(() => {
    if (message == 'teslimedildi') {
      if (sevkiyatSonuc?.success == 1) {
        Swal.fire(`${sevkiyatSonuc.message}`)
      }
    }

    if (depocuMessage) {
      MySwal.fire({
        title: <p>{depocuMessage}</p>,
        icon: 'info',
        confirmButtonText: 'Tamam',
      })
      dispatch(depocuSetMessage(null))
    }

    dispatch(setMessage())
  }, [message, depocuMessage])

  function UrunleriTeslimEt(tahsilat, paymentNumber) {
    dispatch(teslim_et({ tahsilat, paymentNumber }))
  }

  if (row.siparis_durumu == 4) {
    return (
      <div className="bg-green-500 p-2 text-white text-bold">
        <span>Sevkiyat İşlemi Tamamlandı.</span>
      </div>
    )
  } else if (row.siparis_durumu == 3) {
    return (
      <div>
        <button
          className="btn btn-success btn-sm"
          onClick={() => {
            if (row.musteriye_teslim_edilebilirmi == 1) {
              const { value: tahsilat } = Swal.fire({
                title: 'Ürünleri Teslim Edeceksiniz!',
                input: 'text',
                inputLabel: 'Tahsil Edilen Ücret',
                showCancelButton: true,
                cancelButtonText: 'Kapat',
                inputValidator: (value) => {
                  if (!value) {
                    return 'Tahsil Edilen Ücreti Girmeniz Zorunludur!'
                  }
                },
                confirmButtonText: 'Onayla',
                preConfirm: (tahsilat) => {
                  UrunleriTeslimEt(tahsilat, row.payment_number)
                },
              })
            } else {
              dispatch(
                paketlerdekiBarkodlarOkundumu({
                  payment_number: row.payment_number,
                  user_type: user?.type,
                }),
              )
            }
          }}
        >
          {row.musteriye_teslim_edilebilirmi == 1
            ? '  Müşteriye Teslim Et'
            : 'Müşteriye teslim durumunu kontrol et'}
        </button>
      </div>
    )
  }
}

export default SevkiyatBtn
SevkiyatBtn.propTypes = {
  row: PropTypes.object,
}
