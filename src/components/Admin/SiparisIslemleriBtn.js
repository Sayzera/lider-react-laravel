import React from 'react'
import { useDispatch } from 'react-redux'
import { setOnaylaBtnName } from '../../redux/admin/siparisIslemleriSlice'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function SiparisIslemleriBtn({
  row,
  setOpenIslemModal,
  setKargoIslemleriUpdateId,
  _executeScroll,
}) {
  const dispatch = useDispatch()

  if (row?.admin_iptal == 1 && row.musteri_iptal == 0) {
    return (
      <div className="bg-red-500 text-center text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
        <p>Admin İptal Etti</p>
      </div>
    )
  } else if (row?.musteri_iptal == 1 && row.admin_iptal == 0) {
    return (
      <div className="bg-red-500 text-center text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
        <p> Müşteri İptal Etti</p>
      </div>
    )
  } else if (row?.musteri_onay == 1 && row?.admin_onay == 1) {
    return (
      <div className="bg-emerald-500 text-center text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
        <p>Onaylandı</p>
      </div>
    )
  } else {
    return (
      <div>
        {row?.admin_onay == 0 && row?.admin_iptal == 0 && (
          <div className="flex flex-row items-center ">
            <p className=" bg-orange-500 text-center p-2 rounded-md mr-3">Admin Onayı Bekleniyor</p>
            <Link to={`#kargoIslemleriModal`}>
              <a
                href="#kargoIslemleriModal"
                className="bg-blue-600  hover:bg-lightBlue-800  text-white font-bold  p-2  rounded inline-flex items-center "
                style={{
                  border: '1px solid #e2e8f0',
                }}
                onClick={() => {
                  setOpenIslemModal(true)
                  setKargoIslemleriUpdateId(row)
                  dispatch(setOnaylaBtnName('Onayla'))
                  _executeScroll()
                }}
              >
                İşlemler
              </a>
            </Link>
          </div>
        )}
        {row?.admin_onay == 1 && row?.musteri_onay == 0 && (
          <div className="flex flex-row">
            <p
              className="text-center p-2 rounded-md mr-3 mt-1 mb-1"
              style={{ backgroundColor: '#fca5a5' }}
            >
              Müşteri Onayı Bekleniyor
            </p>
            <Link to={`#kargoIslemleriModal`}>
              <a
                href="#kargoIslemleriModal"
                className="bg-blue-600  hover:bg-lightBlue-800  text-white font-bold  p-2  rounded inline-flex items-center "
                onClick={() => {
                  setOpenIslemModal(true)
                  setKargoIslemleriUpdateId(row)
                  dispatch(setOnaylaBtnName('Düzenle'))
                  _executeScroll()
                }}
              >
                İşlemler
              </a>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

SiparisIslemleriBtn.propTypes = {
  row: PropTypes.object,
  setOpenIslemModal: PropTypes.func,
  setKargoIslemleriUpdateId: PropTypes.func,
  _executeScroll: PropTypes.func,
}
export default SiparisIslemleriBtn
