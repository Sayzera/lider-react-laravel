import React from 'react'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { kSayilari, kargo_sayilari_cek } from 'src/redux/user/kargo_islemleri'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/hooks/auth'
import { cariEkstre, selectIsStokDetay, setStokDetay } from 'src/redux/user/cariEkstreSlice'

const CariEkstresiDurumlar = ({ cariDataCount, baslangicTarihi, bitisTarihi, cariKodu }) => {
  // baslangicTarihi={baslangicTarihi}
  // bitisTarihi={bitisTarihi}
  // cariKodu={userData.cari_code}
  const navigate = useNavigate()
  const { user } = useAuth()
  const userData = user()

  const dispatch = useDispatch()
  const kargoSayisi = useSelector(kSayilari)

  const isStokDetay = useSelector(selectIsStokDetay)

  console.log(cariKodu)

  const data = [
    {
      className: 'mb-4',
      color: 'info',
      value: (item) => (
        <div
          onClick={() => {
            dispatch(setStokDetay(false))
            dispatch(
              cariEkstre({
                // cari_kodu: userData.cari_code,
                cari_kodu: cariKodu,
                stok_detay: false,
                ilkTarih: baslangicTarihi,
                sonTarih: bitisTarihi,
              }),
            )
          }}
        >
          <div className="h-16 text-xl">
            Cari Ekstre ({isStokDetay == false ? cariDataCount : 0})
          </div>

          <button>
            <span className="text-xl">{item.linkTitle}</span>
          </button>
        </div>
      ),
      sm: 12,
      lg: 6,
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
            dispatch(setStokDetay(true))

            dispatch(
              cariEkstre({
                // cari_kodu: userData.cari_code,
                cari_kodu: cariKodu,
                stok_detay: true,
                ilkTarih: baslangicTarihi,
                sonTarih: bitisTarihi,
              }),
            )
          }}
        >
          <div>
            <div className="h-16 text-xl">
              Cari Ekstre Detay ({isStokDetay == true ? cariDataCount : 0})
            </div>
          </div>

          <button>
            <span className="text-xl">{item.linkTitle}</span>
          </button>
        </div>
      ),
      sm: 12,
      lg: 6,
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

export default CariEkstresiDurumlar
CariEkstresiDurumlar.propTypes = {
  cariDataCount: PropTypes.number,
  baslangicTarihi: PropTypes.string,
  bitisTarihi: PropTypes.string,
  cariKodu: PropTypes.string,
}
