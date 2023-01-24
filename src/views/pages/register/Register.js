import React, { useState } from 'react'
import { CCard, CCardBody, CCol, CContainer, CForm, CRow } from '@coreui/react'
import language from 'src/config/keywords'
import { useForm, Controller } from 'react-hook-form'
import { sehirler, selectSehirler, selectIlceler, ilceler } from 'src/redux/user/kargo_islemleri'
import { registerData, register, setRegisterData } from 'src/redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const dataSehirler = useSelector(selectSehirler)
  const dataIlceler = useSelector(selectIlceler)
  const dataRegister = useSelector(registerData)

  const [sehirAdi, setSehirAdi] = useState('Bursa')
  const [ilceAdi, setIlceAdi] = useState('İnegöl')
  const [sehir_id, setSehir_id] = useState(16)
  const [ilce_id, setIlce_id] = useState(493)

  const lang = language['tr']
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
  } = useForm()

  const onSubmit = (data) => {
    if (ilceAdi == '') {
      alert('Lütfen ilçe seçiniz')
      return
    }

    let newData = { ...data, sehirAdi, ilceAdi, sehir_id, ilce_id }

    dispatch(register(newData))
  }

  React.useEffect(() => {
    if (dataRegister?.success == 1) {
      reset({
        isim_soyisim: '',
        posta: '',
        firma_unvani: '',
        telefon: '',
        adres: '',
        vergi_no: '',
        vergi_dairesi: '',
        sifre: '',
        sifre_tekrar: '',
      })

      resetField()
      setTimeout(() => {
        dispatch(setRegisterData({}))
        navigate('/login')
      }, 5000)
    }

    dispatch(sehirler())

    dispatch(
      ilceler({
        sehir_id: 16,
      }),
    )
  }, [dataRegister])

  console.log('Register Data', dataRegister)

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <div className="mx-4 my-4">
              <button
                className="bg-gray-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => navigate('/login')}
              >
                Geri Dön
              </button>
            </div>

            <div className="mx-4">
              {dataRegister && dataRegister?.success == 1 ? (
                <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-emerald-500 mt-4">
                  <span className="inline-block align-middle mr-8">
                    <b className="capitalize">Başarılı !</b> {dataRegister?.message}
                  </span>
                </div>
              ) : null}

              {dataRegister && dataRegister?.success == 0 ? (
                <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500 mt-4">
                  <span className="inline-block align-middle mr-8">
                    <b className="capitalize">Hata !</b> {dataRegister?.message}
                  </span>
                </div>
              ) : null}
            </div>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <h1 className="text-center text-2xl font-bold mb-3">Lider Transport</h1>
                <div>
                  <h1 className="text-xl mb-3 px-2 border-b max-w-fit">Bayilik Başvurusu</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4 w-full px-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="firma_unvani"
                    >
                      Firma Ünvanı
                    </label>
                    <Controller
                      name="firma_unvani"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="firma_unvani"
                            placeholder="Firma Ünvanı"
                            {...field}
                          />
                          {errors.firma_unvani?.type == 'required' && (
                            <p className="text-sm text-red-500">{lang.required}</p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  <div className="mb-4 w-full px-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="isim_soyisim"
                    >
                      İsim Soyisim
                    </label>
                    <Controller
                      name="isim_soyisim"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="isim_soyisim"
                            placeholder="İsim Soyisim"
                            {...field}
                          />
                          {errors.isim_soyisim?.type == 'required' && (
                            <p className="text-sm text-red-500">{lang.required}</p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  <div className="mb-4 w-full px-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="e-posta">
                      E-Posta
                    </label>
                    <Controller
                      name="posta"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            id="posta"
                            placeholder="E-Posta"
                            {...field}
                          />
                          {errors.posta?.type == 'required' && (
                            <p className="text-sm text-red-500">{lang.required}</p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  <div className="mb-4 w-full px-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefon">
                      Telefon
                    </label>
                    <Controller
                      name="telefon"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="telefon"
                            placeholder="Telefon"
                            {...field}
                          />
                          {errors.telefon?.type == 'required' && (
                            <p className="text-sm text-red-500">{lang.required}</p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  <div className="md:flex w-full">
                    <div className="mb-4 w-full px-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="tahsil_edilecek_para_birimi"
                      >
                        Şehir
                      </label>
                      <Controller
                        name="sehirler"
                        control={control}
                        render={({ field }) => (
                          <>
                            <select
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="sehirler"
                              {...field}
                              onChange={(e) => {
                                // get data-id
                                const id =
                                  e.target.options[e.target.selectedIndex].getAttribute('data-id')
                                setSehirAdi(e.target.value)
                                setSehir_id(id)
                                setIlceAdi('')
                                dispatch(
                                  ilceler({
                                    sehir_id: id,
                                  }),
                                )
                              }}
                            >
                              {/* <option value="USD">USD</option> */}
                              {dataSehirler.map((item, index) => {
                                if (index == 15) {
                                  return (
                                    <option
                                      selected
                                      key={index}
                                      value={item.isim}
                                      data-id={item.il_no}
                                    >
                                      {item.isim}
                                    </option>
                                  )
                                } else {
                                  return (
                                    <option key={index} value={item.isim} data-id={item.il_no}>
                                      {item.isim}
                                    </option>
                                  )
                                }
                              })}
                            </select>

                            {errors.sehirler?.type == 'required' && (
                              <p className="text-sm text-red-500">{lang.required}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                    <div className="mb-4 w-full px-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="tahsil_edilecek_para_birimi"
                      >
                        İlçe
                      </label>
                      <Controller
                        name="ilceler"
                        control={control}
                        render={({ field }) => (
                          <>
                            <select
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="ilceler"
                              {...field}
                              onChange={(e) => {
                                const id =
                                  e.target.options[e.target.selectedIndex].getAttribute('data-id')
                                setIlce_id(id)
                                setIlceAdi(e.target.value)
                              }}
                            >
                              {/* <option value="USD">USD</option> */}

                              <option value={''}>İlçe Seçiniz</option>
                              {dataIlceler.map((item, index) => {
                                if (item.ilce_no == 493) {
                                  return (
                                    <option
                                      selected
                                      key={item.isim}
                                      data-id={item.ilce_no}
                                      value={item.isim}
                                    >
                                      {item.isim}
                                    </option>
                                  )
                                } else {
                                  return (
                                    <option
                                      data-id={item.ilce_no}
                                      key={item.isim}
                                      value={item.isim}
                                    >
                                      {item.isim}
                                    </option>
                                  )
                                }
                              })}
                            </select>

                            {errors.ilceler?.type == 'required' && (
                              <p className="text-sm text-red-500">{lang.required}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </div>

                  <div className="mb-4 w-full px-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adres">
                      Adres
                    </label>
                    <Controller
                      name="adres"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="adres"
                            placeholder="Adres"
                            {...field}
                          />
                          {errors.adres?.type == 'required' && (
                            <p className="text-sm text-red-500">{lang.required}</p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  <div className="mb-4 w-full px-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="vergi_no"
                    >
                      Vergi / T.C.
                    </label>
                    <Controller
                      name="vergi_no"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            id="vergi_no"
                            placeholder="Vergi / T.C."
                            {...field}
                          />
                          {errors.vergi_no?.type == 'required' && (
                            <p className="text-sm text-red-500">{lang.required}</p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  <div className="mb-4 w-full px-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="vergi_dairesi"
                    >
                      Vergi Dairesi
                    </label>
                    <Controller
                      name="vergi_dairesi"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="vergi_dairesi"
                            placeholder="Vergi Dairesi"
                            {...field}
                          />
                          {errors.vergi_dairesi?.type == 'required' && (
                            <p className="text-sm text-red-500">{lang.required}</p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  <div className="md:flex w-full">
                    <div className="mb-4 w-full px-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sifre">
                        Şifre
                      </label>
                      <Controller
                        name="sifre"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              type="password"
                              id="sifre"
                              placeholder="Şifre"
                              {...field}
                            />
                            {errors.sifre?.type == 'required' && (
                              <p className="text-sm text-red-500">{lang.required}</p>
                            )}
                          </>
                        )}
                      />
                    </div>

                    <div className="mb-4 w-full px-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="sifre_tekrar"
                      >
                        Şifre Tekrar
                      </label>
                      <Controller
                        name="sifre_tekrar"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              type="password"
                              id="sifre_tekrar"
                              placeholder="Şifre Tekrar"
                              {...field}
                            />
                            {errors.sifre_tekrar?.type == 'required' && (
                              <p className="text-sm text-red-500">{lang.required}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <button
                      className="w-full bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Başvuru Yap
                    </button>
                  </div>
                </form>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
