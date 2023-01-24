import React from 'react'
import PropTypes from 'prop-types'

function SevkiyatBtn({ row }) {
  if (row.siparis_durumu == 0) {
    return (
      <div className="bg-orange-500 p-2 text-white text-bold">
        <span>Nakliye Alınmak Üzere Bekliyor</span>
      </div>
    )
  } else if (row.siparis_durumu == 1) {
    return (
      <div className="bg-blue-500 p-2 text-white text-bold">
        <span>Kargonuz Ara Nakliyededir.</span>
      </div>
    )
  } else if (row.siparis_durumu == 2) {
    return (
      <div className="bg-yellow-800 p-2 text-white text-bold">
        <span>Kargonuz Depodadır.</span>
      </div>
    )
  } else if (row.siparis_durumu == 3) {
    return (
      <div className="bg-teal-500 p-2 text-black text-bold">
        <span>Kargonuz Tıra Yüklendi.</span>
      </div>
    )
  } else if (row.siparis_durumu == 4) {
    return (
      <div className="bg-green-500 p-2 text-white text-bold">
        <span>Kargonuz Teslim Edildi.</span>
      </div>
    )
  }
}

export default SevkiyatBtn
SevkiyatBtn.propTypes = {
  row: PropTypes.object,
}
