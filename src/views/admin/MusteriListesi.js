import React, { useState } from 'react'

// components
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import DataTable from 'react-data-table-component'
import DuzenleModal from 'src/components/Admin/kullanici_islemleri/DuzenleModal'
import { fetchUsers, selectUsers } from 'src/redux/admin/AtamaIslemleriSlice'
import {
  deleteUser,
  getCustomers,
  selectCustomers,
  selectMessage,
} from 'src/redux/admin/kullaniciIslemleriSlice'
import { useAuth } from 'src/hooks/auth'
const paginationComponentOptions = {
  rowsPerPageText: 'Gösterim sayısı',
  rangeSeparatorText: 'ile',
  selectAllRowsItem: false,
}

// layout for page

export default function NakiyeciGetir() {
  // Düzenleye tıklayınca seçilen kullanıcıyı state'e atıyoruz
  const [currentUser, setCurrentUser] = useState(null)
  const [duzenleOpenModal, setDuzenleOpenModal] = useState(false)

  const dispatch = useDispatch()
  const users = useSelector(selectUsers)

  const customers = useSelector(selectCustomers)

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)

  const message = useSelector(selectMessage)
  const navigate = useNavigate()

  const { typeControl } = useAuth()
  React.useEffect(() => {
    typeControl('999')
    dispatch(getCustomers())
  }, [message])

  const columns = [
    {
      name: 'Kullanıcı Adı',
      selector: (row) => row.name,
      width: '170px',
    },
    {
      name: 'Telefon',
      selector: (row) => row.phone,
    },

    {
      name: 'İşlemler',
      width: '400px',
      selector: (row) => (
        <>
          <div>
            <button
              className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                navigate('/admin/cari-ekstre/' + row.cari_code)
              }}
            >
              Cari Ekstre
            </button>
          </div>
        </>
      ),
    },
  ]

  return (
    <div className="w-full  mb-12 xl:mb-0 px-4 mt-2">
      <DuzenleModal
        open={duzenleOpenModal}
        setOpen={setDuzenleOpenModal}
        title="Kullanıcı Düzenleme"
        user={currentUser}
      />
      <DataTable
        title={'Müşteri Listesi'}
        selectableRows={true}
        selectableRowsHighlight={true}
        onSelectedRowsChange={(rows) => {
          return rows
        }}
        columns={columns}
        data={customers}
        progressPending={loading}
        pagination
        paginationServer
        key={data.id}
        paginationTotalRows={totalRows}
        paginationComponentOptions={paginationComponentOptions}
      />
    </div>
  )
}
