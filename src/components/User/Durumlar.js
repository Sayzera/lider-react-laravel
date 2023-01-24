import React from 'react'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { kSayilari, kargo_sayilari_cek } from 'src/redux/user/kargo_islemleri'
import { Link, useNavigate } from 'react-router-dom'
import useScroll from 'src/hooks/useScroll'
import { useAuth } from 'src/hooks/auth'

const Durumlar = ({ setModalOpen }) => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const userData = user()

  const dispatch = useDispatch()
  const kargoSayisi = useSelector(kSayilari)
  const data = [
    {
      className: 'mb-4',
      color: 'info',
      value: (item) => (
        <div
          onClick={() => {
            setModalOpen(false)
            navigate('/user/kargolarim/1')
          }}
        >
          <div className="h-16 text-xl">
            Bekleyen Kargolar ({kargoSayisi.onay_bekleyen_kargolar})
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
      className: 'mb-4',
      color: 'success',
      value: (item) => (
        <div
          onClick={() => {
            setModalOpen(false)
            navigate('/user/kargolarim/2')
          }}
        >
          <div className="h-16 text-xl">Onaylanan Kargolar ({kargoSayisi.onaylanan_kargolar})</div>

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
      className: 'mb-4',
      color: 'danger',
      value: (item) => (
        <div
          onClick={() => {
            setModalOpen(false)
            navigate('/user/kargolarim/3')
          }}
        >
          <div>
            <div className="h-16 text-xl">
              İptal Edilen Kargolar ({kargoSayisi.iptal_olan_kargolar})
            </div>
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
    dispatch(kargo_sayilari_cek())
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
