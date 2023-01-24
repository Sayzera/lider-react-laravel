import React from 'react'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom } from '@coreui/icons'
import PropTypes from 'prop-types'

const Durumlar = ({ data }) => {
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

Durumlar.propTypes = {
  data: PropTypes.array,
}

export default Durumlar
