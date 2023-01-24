import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import language from '../../config/keywords'
import {
  kargoIslemleriUpdate,
  loading,
  kargolar,
  selectOnaylaBtnName,
  kagoIslemleriIptal,
  kargoSayilari,
  kargoUpdate,
} from '../../redux/admin/siparisIslemleriSlice'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
export default function KargoIslemleriModal({
  setModalOpen,
  modalOpen,
  kargoIslemleriUpdateId,
  kargoBilgileriKapat,
  _executeScroll,
  _kargoRef,
}) {
  const dispatch = useDispatch()
  const lang = language['tr']
  const selectOnaylaBtnNameState = useSelector(selectOnaylaBtnName)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const formSubmit = (data) => {
    if (selectOnaylaBtnNameState == 'Onayla') {
      /**
       * Bu kısım onaylama işlemleri için
       */
      kargoIslemleriUpdate({
        id: kargoIslemleriUpdateId.id,
        sevk_tarihi: data.tarih,
        teslimat_ucreti: data.ucret,
        teslimat_para_birimi: data.para_birimi,
        tahmini_teslim_tarihi: data.tahmini_teslim_tarihi,
      })(dispatch)

      setTimeout(() => {
        kargolar({
          kargoStatus: 1,
          page: 1,
        })(dispatch)
      }, 200)
      _executeScroll()
    } else {
      _executeScroll()
      kargoIslemleriGuncelle(data)
    }

    setModalOpen(false)
  }

  const kargoIslemleriIptalBtn = () => {
    kagoIslemleriIptal({
      id: kargoIslemleriUpdateId.id,
    })(dispatch)

    kargolar({
      kargoStatus: 1,
      page: 1,
    })(dispatch)

    kargoSayilari()(dispatch)
  }

  const kargoIslemleriGuncelle = (data) => {
    kargoUpdate({
      id: kargoIslemleriUpdateId.id,
      sevk_tarihi: '2022-08-30',
      teslimat_ucreti: data.ucret,
      teslimat_para_birimi: data.para_birimi,
      tahmini_teslim_tarihi: data.tahmini_teslim_tarihi,
    })(dispatch)

    setTimeout(() => {
      kargolar({
        kargoStatus: 1,
        page: 1,
      })(dispatch)

      kargoSayilari()(dispatch)
    }, 200)
  }

  React.useEffect(() => {
    kargoBilgileriKapat(false)
    reset({
      tarih: kargoIslemleriUpdateId?.sevk_tarihi == null ? '' : kargoIslemleriUpdateId?.sevk_tarihi,
      ucret:
        kargoIslemleriUpdateId?.teslimat_ucreti == null
          ? ''
          : kargoIslemleriUpdateId?.teslimat_ucreti,
      // para_birimi:
      //   kargoIslemleriUpdateId?.teslimat_para_birimi == null
      //     ? ''
      //     : kargoIslemleriUpdateId?.teslimat_para_birimi,
      para_birimi: 'EUR',

      tahmini_teslim_tarihi:
        kargoIslemleriUpdateId?.tahmini_teslim_tarihi == null
          ? ''
          : kargoIslemleriUpdateId?.tahmini_teslim_tarihi,
    })
  }, [kargoIslemleriUpdateId])

  return (
    <>
      {modalOpen ? (
        <>
          <div id="kargoIslemleriModal" ref={_kargoRef}>
            <div>
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">İşlemler</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModalOpen(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div className="px-3 py-6 ">
                  <form onSubmit={handleSubmit(formSubmit)}>
                    {/* <div>
                      <label className="px-3 ml-3 text-xs font-semibold inline-block py-2  uppercase rounded text-emerald-600 bg-emerald-200 w-40  last:mr-0 m ">
                        Tarih
                      </label>
                      <Controller
                        name="tarih"
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              type="date"
                              className="px-3 py-3 m-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                              {...field}
                            />
                            {errors.tarih?.type == 'required' && (
                              <div className="ml-3 mb-2 text-sm text-red-500">{lang.required}</div>
                            )}
                          </>
                        )}
                      />
                    </div> */}

                    <div>
                      <label className="px-3 ml-3 text-xs font-semibold inline-block py-2  uppercase rounded text-emerald-600 bg-emerald-200 w-40  last:mr-0 m ">
                        Ücret
                      </label>
                      <Controller
                        name="ucret"
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <>
                            <input
                              type="text"
                              className="px-3 py-3 m-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                              {...field}
                            />
                            {errors.ucret?.type == 'required' && (
                              <div className="ml-3 mb-2 text-sm text-red-500">{lang.required}</div>
                            )}
                          </>
                        )}
                      />
                    </div>

                    <div>
                      <label className="px-3 ml-3 text-xs font-semibold inline-block py-2  uppercase rounded text-emerald-600 bg-emerald-200 w-40  last:mr-0 m ">
                        Para Birimi
                      </label>
                      <Controller
                        name="para_birimi"
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <>
                            <input
                              type="text"
                              readOnly
                              className="px-3 py-3 m-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                              {...field}
                            />
                            {errors.para_birimi?.type == 'required' && (
                              <div className="ml-3 mb-2 text-sm text-red-500">{lang.required}</div>
                            )}
                          </>
                        )}
                      />
                    </div>

                    <div>
                      <label className="px-3 ml-3 text-xs font-semibold inline-block py-2  uppercase rounded text-emerald-600 bg-emerald-200 w-40  last:mr-0 m ">
                        Tahmini Teslim Tarihi
                      </label>
                      <Controller
                        name="tahmini_teslim_tarihi"
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <>
                            <input
                              type="date"
                              className="px-3 py-3 m-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                              {...field}
                            />
                            {errors.tahmini_teslim_tarihi?.type == 'required' && (
                              <div className="ml-3 mb-2 text-sm text-red-500">{lang.required}</div>
                            )}
                          </>
                        )}
                      />
                    </div>
                    <div className="md:flex items-center justify-end p-6  border-solid border-blueGray-200 rounded-b">
                      <button
                        className="w-full md:w-80 mb-2 mt-2 bg-yellow-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setModalOpen(false)}
                      >
                        Ekranı Kapat
                      </button>

                      <button
                        className="w-full md:w-80 mb-2 mt-2 bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          setModalOpen(false)
                          kargoIslemleriIptalBtn()
                        }}
                      >
                        İptal Et
                      </button>

                      {
                        <>
                          {selectOnaylaBtnNameState == 'Onayla' ? (
                            <button
                              type="submit"
                              className="w-full md:w-80  mb-2 mt-2 bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            >
                              Onayla
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="w-full md:w-80  mb-2 mt-2 bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            >
                              Düzenle
                            </button>
                          )}
                        </>
                      }
                    </div>
                  </form>
                </div>

                {/*footer*/}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

KargoIslemleriModal.propTypes = {
  modalOpen: PropTypes.bool,
  setModalOpen: PropTypes.func,
  kargoIslemleriIptalBtn: PropTypes.func,
  selectOnaylaBtnNameState: PropTypes.string,
  kargoIslemleriUpdateId: PropTypes.object,
  kargoBilgileriKapat: PropTypes.func,
  _executeScroll: PropTypes.func,
  _kargoRef: PropTypes.object,
}
