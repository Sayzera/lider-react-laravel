import React, { useState } from 'react'

// components
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import DataTable from 'react-data-table-component'
import { fetchUsers, selectUsers } from 'src/redux/admin/AtamaIslemleriSlice'
import DuzenleModal from 'src/components/Admin/kullanici_islemleri/DuzenleModal'
import { deleteUser, selectMessage } from 'src/redux/admin/kullaniciIslemleriSlice'
import { useAuth } from 'src/hooks/auth'
const paginationComponentOptions = {
  rowsPerPageText: 'Gösterim sayısı',
  rangeSeparatorText: 'ile',
  selectAllRowsItem: false,
}

// layout for page

export default function NakiyeciGetir() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)

  const dispatch = useDispatch()
  const users = useSelector(selectUsers)
  const message = useSelector(selectMessage)

  // Düzenleye tıklayınca seçilen kullanıcıyı state'e atıyoruz
  const [currentUser, setCurrentUser] = useState(null)

  const [duzenleOpenModal, setDuzenleOpenModal] = useState(false)

  const { typeControl } = useAuth()

  React.useEffect(() => {
    typeControl('999')
    dispatch(
      fetchUsers({
        type: 1,
      }),
    )
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
      width: '500px',
      selector: (row) => (
        <>
          <div>
            <button
              className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                setDuzenleOpenModal(true)
                setCurrentUser(row)
              }}
            >
              Düzenle
            </button>

            <button
              onClick={() => {
                dispatch(
                  deleteUser({
                    id: row.id,
                  }),
                )
              }}
              className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              {row.engel == 1 ? 'Engeli Kaldır' : 'Engelle'}
            </button>

            <button
              onClick={() => navigate(`/admin/aranakliyeci-atama/${row.id}/Ara Nakliyeci Atama`)}
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Atama Yap
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
        title={'Ara Nakliyeciler'}
        selectableRows={true}
        selectableRowsHighlight={true}
        onSelectedRowsChange={(rows) => {
          return rows
        }}
        columns={columns}
        data={users}
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
