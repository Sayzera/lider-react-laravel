import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectKullaniciEkleModal,
  kullaniciEkleModalKapat,
} from '../../../redux/admin/kullaniciIslemleriSlice'
import language from '../../../config/keywords'
import PropTypes from 'prop-types'

export default function KullaniciEkle({ setModalOpen, modalOpen }) {
  const selectModal = useSelector(selectKullaniciEkleModal)
  const dispatch = useDispatch()
  const lang = language['tr']
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const formSubmit = () => {
    alert('s')
  }

  console.log(selectModal)
  return (
    <>
      {selectModal ? (
        <>
          <div className="inset-0 z-50 outline-none focus:outline-none" id="KullaniciEkle">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Kullanıcı Oluştur</h3>
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
                      <label className="px-3 ml-3 text-xs font-semibold inline-block py-1  uppercase rounded text-emerald-600 bg-emerald-200 w-20  last:mr-0 m ">
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
                      <label className="px-3 ml-3 text-xs font-semibold inline-block py-1  uppercase rounded text-emerald-600 bg-emerald-200 w-20  last:mr-0 m ">
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
                      <label className="px-3 ml-3 text-xs font-semibold inline-block py-1  uppercase rounded text-emerald-600 bg-emerald-200 w-20  last:mr-0 m ">
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
                      <label className="px-3 ml-3 text-xs font-semibold inline-block py-1  uppercase rounded text-emerald-600 bg-emerald-200 w-20  last:mr-0 m ">
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
                      <label className="px-3 ml-3 text-xs font-semibold inline-block py-1  uppercase rounded text-emerald-600 bg-emerald-200 w-20  last:mr-0 m ">
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
                              <option value="nakliyeci">Nakliyeci</option>
                              <option value="depocu">Depocu</option>
                              <option value="ara_nakliyeci">Ara Nakliyeci</option>
                            </select>
                            {errors.kullanici_tipi?.type == 'required' && (
                              <div className="ml-3 mb-2 text-sm text-red-500">{lang.required}</div>
                            )}
                          </>
                        )}
                      />
                      <div className="w-full px-1">
                        <button
                          className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase text-sm py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 px-6"
                          type="submit"
                        >
                          Oluştur
                        </button>{' '}
                      </div>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => dispatch(kullaniciEkleModalKapat())}
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

KullaniciEkle.propTypes = {
  setModalOpen: PropTypes.bool,
  modalOpen: PropTypes.func,
}
