import React from 'react'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom } from '@coreui/icons'

const WidgetsDropdown = () => {
  const data = [
    {
      className: 'mb-4',
      color: 'primary',
      value: (item) => (
        <>
          <div>
            26K{' '}
            <span className="fs-6 fw-normal">
              (-12.4% <CIcon icon={cilArrowBottom} />)
            </span>
          </div>

          <div>{item.title}</div>
        </>
      ),
      sm: 6,
      lg: 3,
      title: 'Users',
      link: '#',
      linkTitle: 'View all',
    },

    {
      className: 'mb-4',
      color: 'primary',
      value: (item) => (
        <>
          <div>
            26K{' '}
            <span className="fs-6 fw-normal">
              (-12.4% <CIcon icon={cilArrowBottom} />)
            </span>
          </div>

          <div>{item.title}</div>
        </>
      ),
      sm: 6,
      lg: 3,
      title: 'Users',
      link: '#',
      linkTitle: 'View all',
    },

    {
      className: 'mb-4',
      color: 'primary',
      value: (item) => (
        <>
          <div>
            26K{' '}
            <span className="fs-6 fw-normal">
              (-12.4% <CIcon icon={cilArrowBottom} />)
            </span>
          </div>

          <div>{item.title}</div>
        </>
      ),
      sm: 6,
      lg: 3,
      title: 'Users',
      link: '#',
      linkTitle: 'View all',
    },

    {
      className: 'mb-4',
      color: 'primary',
      value: (item) => (
        <div key={Math.random()}>
          <div>
            26K{' '}
            <span className="fs-6 fw-normal">
              (-12.4% <CIcon icon={cilArrowBottom} />)
            </span>
          </div>

          <div>{item.title}</div>
        </div>
      ),
      sm: 6,
      lg: 3,
      title: 'Users',
      link: '#',
      linkTitle: 'View all',
    },
  ]
  return (
    <CRow>
      {data.map((item, index) => (
        <>
          <CCol sm={6} lg={3}>
            <CWidgetStatsA className="mb-4" color="primary" value={item.value(item)} />
          </CCol>
        </>
      ))}
    </CRow>
  )
}

export default WidgetsDropdown
