import React from 'react'
import { useDispatch } from 'react-redux'
import {
  setGuncellenecekData,
  kargo_onayla,
  setOnaylandimiState,
  kargolarim,
  kargo_sayilari_cek,
  iptal_et,
  setIptalOldumuState,
} from 'src/redux/user/kargo_islemleri'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function SiparisIslemleriBtn({
  row,
  setOpenGuncelleModal,
  setGuncelleData,
  executeScroll,
  kargoBilgileriModal,
  setOpenIptal,
  openIptal,
  setIptalEdilenKargoId,
}) {
  console.log('Sipariş İşlemleri Btn', row)
  const dispatch = useDispatch()
  const Onayla = (data) => {
    dispatch(
      kargo_onayla({
        id: data.id,
      }),
    )
    dispatch(
      kargolarim({
        kargoStatus: 1,
      }),
    )

    dispatch(kargo_sayilari_cek())

    setTimeout(() => {
      dispatch(setOnaylandimiState())
    }, 4000)
  }

  const IptalEt = (data) => {
    setOpenIptal(true)
    setIptalEdilenKargoId(data)
    // dispatch(
    //   iptal_et({
    //     id: data.id,
    //     iptal_nedeni: openIptal,
    //   }),
    // )
    // dispatch(
    //   kargolarim({
    //     kargoStatus: 1,
    //   }),
    // )
    // dispatch(kargo_sayilari_cek())
    // setTimeout(() => {
    //   dispatch(setIptalOldumuState())
    // }, 4000)
    // setOpenIptal(false)
  }

  const BilgileriGuncelle = () => {
    dispatch(setGuncellenecekData(row))
    setOpenGuncelleModal(true)
  }

  if (row?.admin_iptal == 1 && row.musteri_iptal == 0) {
    return (
      <div className="bg-red-500 text-center p-2 rounded">
        <p className="text-white font-bold">Admin İptal Etti</p>
      </div>
    )
  } else if (row?.musteri_iptal == 1 && row.admin_iptal == 0) {
    return (
      <div className="bg-red-500 text-center p-2 rounded">
        <p className="text-white font-bold">İptal Ettiniz</p>
      </div>
    )
  } else if (row?.musteri_onay == 1 && row?.admin_onay == 1) {
    return (
      <div className="flex flex-row">
        <div className="bg-emerald-500 items-center text-center p-2 mb-2 rounded">
          <p className="text-white font-bold">Onaylandı</p>
        </div>
        <div className="items-center text-center mb-2 ml-2 ">
          <Link to={`/user/qrkod-goruntule/` + row?.payment_number}>
            <button
              className="bg-blue-600  hover:bg-blue-800 text-white font-bold p-2 px-4 rounded"
              style={{
                border: '1px solid #e2e8f0',
              }}
            >
              QR Kodları Görüntüle
            </button>
          </Link>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        {row?.admin_onay == 0 && row?.admin_iptal == 0 && (
          <>
            <div className=" flex flex-row">
              <div className="bg-orange-500 text-center p-2 rounded-md mr-3">
                <p className="text-white bg-orange-500">Admin Onayı Bekleniyor</p>
              </div>

              <button
                onClick={() => {
                  BilgileriGuncelle()
                  executeScroll()
                  kargoBilgileriModal(false)
                }}
                className="bg-blue-500  hover:bg-blue-800 text-white font-bold py-2 px-4 rounded inline-flex items-center "
                style={{
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                }}
              >
                Düzenle
              </button>
            </div>
          </>
        )}
        {row?.admin_onay == 1 && row?.musteri_onay == 0 && (
          <>
            <div className="flex flex-row">
              <div
                style={{ backgroundColor: '#fca5a5' }}
                className="text-center p-2 rounded-md mr-3"
              >
                <p style={{ color: '#ff0000' }} className="font-bold">
                  Müşteri Onayı Bekleniyor
                </p>
              </div>

              <button
                className="bg-emerald-500  hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded inline-flex items-center "
                style={{
                  border: '1px solid #e2e8f0',
                }}
                onClick={() => Onayla(row)}
              >
                Onayla
              </button>

              <button
                className="text-white font-bold py-2 px-4 rounded inline-flex items-center bg-red-500 hover:bg-red-800"
                style={{
                  border: '1px solid #e2e8f0',
                }}
                onClick={() => IptalEt(row)}
              >
                İptal Et
              </button>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default SiparisIslemleriBtn
SiparisIslemleriBtn.propTypes = {
  setOpenGuncelleModal: PropTypes.func,
  setGuncelleData: PropTypes.array,
  row: PropTypes.object,
  executeScroll: PropTypes.func,
  kargoBilgileriModal: PropTypes.func,
  setOpenIptal: PropTypes.func,
  openIptal: PropTypes.bool,
  setIptalEdilenKargoId: PropTypes.func,
}
