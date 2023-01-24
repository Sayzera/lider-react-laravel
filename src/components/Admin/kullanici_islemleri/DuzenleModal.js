import { CButton, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Controller, useForm } from 'react-hook-form'
import language from 'src/config/keywords'
import { useDispatch, useSelector } from 'react-redux'
import { selectMessage, updateUser } from 'src/redux/admin/kullaniciIslemleriSlice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
function DuzenleModal({ open, setOpen, title, user }) {
  const dispatch = useDispatch()
  const message = useSelector(selectMessage)

  const lang = language['tr']
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const [userTypes, setUserTypes] = useState([
    {
      id: '',
      name: 'Kullanıcı Tipi Seçiniz',
    },
    {
      id: 1,
      name: 'Ara Nakliyeci',
    },
    {
      id: 2,
      name: 'Nakliyeci',
    },
    {
      id: 3,
      name: 'Depocu',
    },
  ])

  if (message != null) {
    MySwal.fire({
      title: 'Başarılı!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Tamam',
    })
  }

  React.useEffect(() => {
    reset({
      ad_soyad: user?.name,
      email: user?.email,
      telefon: user?.phone,
      kullanici_tipi: user?.user_type,
      sifre: '',
    })
  }, [user])

  const formSubmit = (data) => {
    console.log(data)
    dispatch(updateUser({ ...data, id: user?.id }))

    console.log('eqw')
  }
  return (
    <>
      <CModal size="xl" visible={open} onClose={() => setOpen(false)}>
        <CModalHeader>
          <CModalTitle>{title}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
            {/*content*/}
            <div className="px-2 py-2 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
              {/*header*/}
              {/*body*/}
              <div className="p-2">
                <form onSubmit={handleSubmit(formSubmit)}>
                  <div>
                    <label className="px-3 ml-3 text-xs font-semibold inline-block py-2  uppercase rounded text-emerald-600 bg-emerald-200 w-40  last:mr-0 m ">
                      Ad Soyad
                    </label>
                    <Controller
                      name="ad_soyad"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <>
                          <input
                            type="text"
                            placeholder="Ad Soyad"
                            className="px-3 py-3 m-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                            {...field}
                          />
                          {errors.ad_soyad?.type == 'required' && (
                            <div className="ml-3 mb-2 text-sm text-red-500">{lang.required}</div>
                          )}
                        </>
                      )}
                    />
                    <label className=" px-3 ml-3 text-xs font-semibold inline-block py-2  uppercase rounded text-emerald-600 bg-emerald-200 w-40  last:mr-0 m ">
                      E Posta
                    </label>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <>
                          <input
                            type="text"
                            placeholder="E Posta"
                            className="px-3 py-3 m-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                            {...field}
                          />
                          {errors.email?.type == 'required' && (
                            <div className="ml-3 mb-2 text-sm text-red-500">{lang.required}</div>
                          )}
                        </>
                      )}
                    />
                    <label className="px-3  ml-3 text-xs font-semibold inline-block py-2  uppercase rounded text-emerald-600 bg-emerald-200 w-40  last:mr-0 m ">
                      Telefon
                    </label>
                    <Controller
                      name="telefon"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <>
                          <input
                            type="text"
                            placeholder="Telefon"
                            className="px-3 py-3 m-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                            {...field}
                          />
                          {errors.telefon?.type == 'required' && (
                            <div className="ml-3 mb-2 text-sm text-red-500">{lang.required}</div>
                          )}
                        </>
                      )}
                    />
                    <label className="px-3 ml-3 text-xs font-semibold inline-block py-2 uppercase rounded text-emerald-600 bg-emerald-200 w-40  last:mr-0 m ">
                      Şifre
                    </label>
                    <Controller
                      name="sifre"
                      control={control}
                      render={({ field }) => (
                        <>
                          <input
                            type="password"
                            placeholder="Şifre"
                            autoComplete="off"
                            className="px-3 py-3 m-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                            {...field}
                          />
                          {errors.sifre?.type == 'required' && (
                            <div className="ml-3 mb-2 text-sm text-red-500">{lang.required}</div>
                          )}
                        </>
                      )}
                    />
                    {/* <label className="px-3 ml-3 text-xs font-semibold inline-block py-2  uppercase rounded text-emerald-600 bg-emerald-200 w-40  last:mr-0 m ">
                      Kullanıcı Tipi
                    </label>
                    <Controller
                      name="kullanici_tipi"
                      control={control}
                      defaultValue={user?.type}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <>
                          <select
                            type="password"
                            placeholder="Şifre"
                            className="px-3 py-3 m-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                            {...field}
                          >
                            {userTypes.map((item, index) => {
                              if (item.id == user.type) {
                                return (
                                  <option selected key={'type' + index} value={item.id}>
                                    {item.name}
                                  </option>
                                )
                              } else {
                                return (
                                  <option key={'type' + index} value={item.id}>
                                    {item.name}
                                  </option>
                                )
                              }
                            })}
                          </select>
                          {errors.kullanici_tipi?.type == 'required' && (
                            <div className="ml-3 mb-2 text-sm text-red-500">{lang.required}</div>
                          )}
                        </>
                      )}
                    /> */}
                    <div className="w-full px-1">
                      <button
                        className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase text-sm py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 px-6"
                        type="submit"
                      >
                        Düzenle
                      </button>{' '}
                    </div>
                  </div>
                </form>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"></div>
            </div>
          </div>
        </CModalBody>
      </CModal>
    </>
  )
}

export default DuzenleModal

DuzenleModal.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  title: PropTypes.string,
  user: PropTypes.object,
}
