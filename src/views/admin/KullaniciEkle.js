import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectKullaniciEkleModal,
  kullaniciEkleModalKapat,
  createUser,
  selectMessage,
  setMessage,
} from '../../redux/admin/kullaniciIslemleriSlice'
import language from '../../config/keywords'
import PropTypes from 'prop-types'
import useScroll from 'src/hooks/useScroll'
import { useAuth } from 'src/hooks/auth'

export default function KullaniciEkle({ setModalOpen, modalOpen }) {
  const selectModal = useSelector(selectKullaniciEkleModal)
  const dispatch = useDispatch()
  const message = useSelector(selectMessage)
  const [executeScroll, elref] = useScroll()

  const { typeControl } = useAuth()
  React.useEffect(() => {
    typeControl('999')
    executeScroll()

    if (message != null) {
      dispatch(setMessage(null))
    }
  }, [message])

  const lang = language['tr']
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const formSubmit = (data) => {
    dispatch(createUser(data))
    executeScroll()
    reset({
      ad_soyad: '',
      email: '',
      telefon: '',
      phone: '',
      kullanici_tipi: '',
    })
  }

  const selectMessageState = useSelector(selectMessage)

  return (
    <>
      {selectMessageState && (
        <div ref={elref}>
          <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-emerald-500">
            <span className="text-xl inline-block mr-5 align-middle">
              <i className="fas fa-bell"></i>
            </span>
            <span className="ml-2 inline-block align-middle mr-8">{selectMessageState}</span>
          </div>
        </div>
      )}
      <div>
        <div>
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl md:text-3xl font-semibold">Kullanıcı Oluştur</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => dispatch(kullaniciEkleModalKapat())}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
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
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          type="password"
                          placeholder="Şifre"
                          className="px-3 py-3 m-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                          {...field}
                        />
                        {errors.sifre?.type == 'required' && (
                          <div className="ml-3 mb-2 text-sm text-red-500">{lang.required}</div>
                        )}
                      </>
                    )}
                  />
                  <label className="px-3 ml-3 text-xs font-semibold inline-block py-2  uppercase rounded text-emerald-600 bg-emerald-200 w-40  last:mr-0 m ">
                    Kullanıcı Tipi
                  </label>
                  <Controller
                    name="kullanici_tipi"
                    control={control}
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
                          <option value="">Kullanıcı Tipi Seçiniz</option>
                          <option value="2">Nakliyeci</option>
                          <option value="3">Depocu</option>
                          <option value="1">Ara Nakliyeci</option>
                        </select>
                        {errors.kullanici_tipi?.type == 'required' && (
                          <div className="ml-3 mb-2 text-sm text-red-500">{lang.required}</div>
                        )}
                      </>
                    )}
                  />
                  <div className="w-full flex flex-row items-center justify-center">
                    <button
                      className="bg-emerald-500 md:w-full w-52 text-white active:bg-emerald-600 font-bold uppercase text-sm py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1  ease-linear transition-all duration-150 px-6 mb-6"
                      type="submit"
                    >
                      Oluştur
                    </button>{' '}
                  </div>
                </div>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"></div>
          </div>
        </div>
      </div>
    </>
  )
}

KullaniciEkle.propTypes = {
  setModalOpen: PropTypes.bool,
  modalOpen: PropTypes.func,
}
