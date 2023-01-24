import React from 'react'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { sevkiyat_sayilarini_cek, SevkiyatSayilari } from 'src/redux/user/sevkiyat_islemleri'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const Durumlar = ({ setModalOpen }) => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const sevkiyatSayisi = useSelector(SevkiyatSayilari)
  const data = [
    {
      className: 'mb-6',
      color: 'primary',
      value: (item) => (
        <div
          onClick={() => {
            setModalOpen(false)
            navigate('/user/sevkiyat-durumlari/1')
          }}
        >
          <div className="h-16 text-xl">
            Bekleyen Sevkiyatlar ({sevkiyatSayisi.bekleyen_sevkiyatlar})
          </div>

          <button>
            <span className="text-xl">{item.linkTitle}</span>
          </button>
        </div>
      ),
      sm: 6,
      lg: 4,
      title: 'Users',
      link: '#',
      linkTitle: 'Görüntüle',
    },
    {
      className: 'mb-6',
      color: 'warning',
      value: (item) => (
        <div
          onClick={() => {
            setModalOpen(false)
            navigate('/user/sevkiyat-durumlari/2')
          }}
        >
          <div className="h-16 text-xl">
            Devam Eden Sevkiyatlar ({sevkiyatSayisi.devam_eden_sevkiyatlar})
          </div>

          <button>
            <span className="text-xl">{item.linkTitle}</span>
          </button>
        </div>
      ),
      sm: 6,
      lg: 4,
      title: 'Users',
      link: '#',
      linkTitle: 'Görüntüle',
    },

    {
      className: 'mb-6',
      color: 'dark',
      value: (item) => (
        <div
          onClick={() => {
            setModalOpen(false)
            navigate('/user/sevkiyat-durumlari/3')
          }}
        >
          <div className="h-16 text-xl">
            Tamamlanan Sevkiyatlar ({sevkiyatSayisi.tamamlanan_sevkiyatlar})
          </div>

          <button>
            <span className="text-xl">{item.linkTitle}</span>
          </button>
        </div>
      ),
      sm: 6,
      lg: 4,
      title: 'Users',
      link: '#',
      linkTitle: 'Görüntüle',
    },
  ]

  React.useEffect(() => {
    dispatch(sevkiyat_sayilarini_cek())
  }, [])

  return (
    <CRow>
      {data.map((item, index) => (
        <CCol key={'durum' + index} sm={item.sm} lg={item.lg}>
          <CWidgetStatsA className="mb-4" color={item.color} value={item.value(item)} />
        </CCol>
      ))}
    </CRow>
  )
}

export default Durumlar
Durumlar.propTypes = {
  setModalOpen: PropTypes.func,
}
