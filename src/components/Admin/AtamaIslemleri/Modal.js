import { CButton, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

function AtamaModal({ children, open, setOpen, title }) {
  return (
    <>
      <CModal size="xl" visible={open} onClose={() => setOpen(false)}>
        <CModalHeader>
          <CModalTitle>{title}</CModalTitle>
        </CModalHeader>
        <CModalBody>{children}</CModalBody>
      </CModal>
    </>
  )
}

export default AtamaModal

AtamaModal.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  title: PropTypes.string,
}
