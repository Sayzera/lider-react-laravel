import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import language from 'src/config/keywords'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  gData,
  kargo_guncelle,
  VeriGuncellendimi,
  kargolarim,
  selectSehirler,
  selectIlceler,
  ilceler,
  sehirler,
} from 'src/redux/user/kargo_islemleri'

export default function SiparisModal({ setModalOpen, modalOpen, elref }) {
  const _guncellenecekData = useSelector(gData)
  const dispatch = useDispatch()
  const lang = language['tr']
  const VGuncellendimi = useSelector(VeriGuncellendimi)

  const dataSehirler = useSelector(selectSehirler)
  const dataIlceler = useSelector(selectIlceler)

  const [sehirAdi, setSehirAdi] = useState(_guncellenecekData.sehirAdi)

  const [ilceAdi, setIlceAdi] = useState(_guncellenecekData.ilceAdi)

  const [sehir_id, setSehir_id] = useState(_guncellenecekData.sehir_id)
  const [ilce_id, setIlce_id] = useState(_guncellenecekData.ilce_id)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (update_data) => {
    let newData = {
      ...update_data,
      sehirAdi: sehirAdi == undefined ? _guncellenecekData.sehirAdi : sehirAdi,
      ilceAdi: ilceAdi == undefined ? _guncellenecekData.ilceAdi : ilceAdi,
      sehir_id: sehir_id == undefined ? _guncellenecekData.sehir_id : sehir_id,
      ilce_id: ilce_id == undefined ? _guncellenecekData.ilce_id : ilce_id,
    }

    dispatch(kargo_guncelle(newData))
    dispatch(
      kargolarim({
        kargoStatus: 1,
      }),
    )
  }

  React.useEffect(() => {
    dispatch(sehirler())

    dispatch(
      ilceler({
        sehir_id: _guncellenecekData.sehir_id,
      }),
    )

    reset({
      siparisId: _guncellenecekData.id,
      k_parca_sayisi: _guncellenecekData.kargo_parca_sayisi,
      k_metre_kup: _guncellenecekData.metrekup,
      gidecegi_adres: _guncellenecekData.adres,
      teslim_alacak_kisi: _guncellenecekData.teslim_alacak_kisi,
      email: _guncellenecekData.mail_adresi,
      telefon: _guncellenecekData.telefon,
      telefon2: _guncellenecekData.telefon_2,
      tahsil_edilecek_ucret: _guncellenecekData.tahsil_ucret,
      depo_teslim_tarihi: _guncellenecekData.teslim_tarihi,
      aciklama: _guncellenecekData.aciklama,
      tahsil_edilecek_para_birimi: _guncellenecekData.para_birimi,
      tedarikci_unvan: _guncellenecekData.tedarikci_unvan,
      tedarikci_adres: _guncellenecekData.tedarikci_adres,
      tedarikci_telefon: _guncellenecekData.tedarikci_tel,
      navlun_bedeli: _guncellenecekData.navlun_bedeli,
      navlun_bedeli_para_birimi: _guncellenecekData.navlun_bedeli_para_birimi,
    })
  }, [_guncellenecekData])

  return (
    <>
      {modalOpen ? (
        <>
          <div className="" ref={elref}>
            <div className="">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Kargo Bilgilerini Güncelle</h3>
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
                {_guncellenecekData?.kargo_parca_sayisi && (
                  <div className="px-2 pt-2">
                    {VGuncellendimi ? (
                      <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-emerald-500">
                        <span className="inline-block align-middle mr-8">
                          <b className="capitalize">Başarılı !</b> {lang.kargom_guncelleme.basarili}
                        </span>
                      </div>
                    ) : null}

                    {VGuncellendimi == 2 ? (
                      <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
                        <span className="inline-block align-middle mr-8">
                          <b className="capitalize">Hata !</b> {lang.kargom_guncelleme.hata}
                        </span>
                      </div>
                    ) : null}
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-4 w-full px-2">
                        <Controller
                          name="siparisId"
                          control={control}
                          render={({ field }) => (
                            <>
                              <input type="hidden" {...field} />
                            </>
                          )}
                        />
                      </div>

                      <div className="md:flex w-full">
                        <div className="mb-4 w-full px-2">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="k_parca_sayisi"
                          >
                            Kargocu Adı
                          </label>
                          <Controller
                            name="tedarikci_unvan"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <>
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  type="text"
                                  id="tedarikci_unvan"
                                  placeholder="Tedarikçi Ünvan"
                                  {...field}
                                />
                                {errors.tedarikci_unvan?.type == 'required' && (
                                  <p className="text-sm text-red-500">{lang.required}</p>
                                )}
                              </>
                            )}
                          />
                        </div>

                        <div className="mb-4 w-full px-2">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="k_metre_kup"
                          >
                            Kargocu Telefon
                          </label>
                          <Controller
                            name="tedarikci_telefon"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <>
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  id="tedarikci_telefon"
                                  type="text"
                                  placeholder="Tedarikçi Telefon"
                                  {...field}
                                />

                                {errors.tedarikci_telefon?.type == 'required' && (
                                  <p className="text-sm text-red-500">{lang.required}</p>
                                )}
                              </>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="gidecegi_adres"
                        >
                          Kargocu Adres
                        </label>
                        <Controller
                          name="tedarikci_adres"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="tedarikci_adres"
                                placeholder="Adres"
                                {...field}
                              ></textarea>

                              {errors.tedarikci_adres?.type == 'required' && (
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
                            Şehirler
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
                                      e.target.options[e.target.selectedIndex].getAttribute(
                                        'data-id',
                                      )
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
                                    if (item.il_no == _guncellenecekData.sehir_id) {
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
                            İlçeler
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
                                      e.target.options[e.target.selectedIndex].getAttribute(
                                        'data-id',
                                      )
                                    setIlce_id(id)
                                    setIlceAdi(e.target.value)
                                  }}
                                >
                                  {/* <option value="USD">USD</option> */}

                                  <option value={''}>İlçe Seçiniz</option>
                                  {dataIlceler.map((item, index) => {
                                    if (item.ilce_no == _guncellenecekData.ilce_id) {
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

                      <div className="md:flex w-full">
                        <div className="mb-4 w-full px-2">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="k_parca_sayisi"
                          >
                            Kargo Parça Sayısı
                          </label>
                          <Controller
                            name="k_parca_sayisi"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <>
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  type="number"
                                  id="k_parca_sayisi"
                                  placeholder="Kargo Parça Sayısı"
                                  {...field}
                                />
                                {errors.k_parca_sayisi?.type == 'required' && (
                                  <p className="text-sm text-red-500">{lang.required}</p>
                                )}
                              </>
                            )}
                          />
                        </div>

                        <div className="mb-4 w-full px-2">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="k_metre_kup"
                          >
                            Kaç M³
                          </label>
                          <Controller
                            name="k_metre_kup"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <>
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  id="k_metre_kup"
                                  type="number"
                                  placeholder="Kaç M³"
                                  {...field}
                                />

                                {errors.k_metre_kup?.type == 'required' && (
                                  <p className="text-sm text-red-500">{lang.required}</p>
                                )}
                              </>
                            )}
                          />
                        </div>
                      </div>

                      <div className="mb-4 px-2">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="gidecegi_adres"
                        >
                          Gideceği Adres
                        </label>
                        <Controller
                          name="gidecegi_adres"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <>
                              <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="gidecegi_adres"
                                placeholder="Gideceği Adres"
                                {...field}
                              ></textarea>

                              {errors.gidecegi_adres?.type == 'required' && (
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
                            htmlFor="teslim_alacak_kisi"
                          >
                            Teslim Alacak Kişi
                          </label>
                          <Controller
                            name="teslim_alacak_kisi"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <>
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  id="teslim_alacak_kisi"
                                  type="text"
                                  placeholder="Teslim Alacak Kişi"
                                  {...field}
                                />

                                {errors.teslim_alacak_kisi?.type == 'required' && (
                                  <p className="text-sm text-red-500">{lang.required}</p>
                                )}
                              </>
                            )}
                          />
                        </div>

                        <div className="mb-4 w-full px-2">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                          >
                            E Posta Adresi
                          </label>
                          <Controller
                            name="email"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <>
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  id="email"
                                  type="email"
                                  placeholder="E Posta Adresi"
                                  {...field}
                                />

                                {errors.email?.type == 'required' && (
                                  <p className="text-sm text-red-500">{lang.required}</p>
                                )}
                              </>
                            )}
                          />
                        </div>
                      </div>

                      <div className="md:flex w-full">
                        <div className="mb-4 w-full px-2">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="telefon"
                          >
                            Telefon Numarası
                          </label>
                          <Controller
                            name="telefon"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <>
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  id="telefon"
                                  type="text"
                                  placeholder="Telefon Numarası"
                                  {...field}
                                />

                                {errors.telefon?.type == 'required' && (
                                  <p className="text-sm text-red-500">{lang.required}</p>
                                )}
                              </>
                            )}
                          />
                        </div>

                        <div className="mb-4 w-full px-2">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="telefon2"
                          >
                            2.Telefon Numarası
                          </label>
                          <Controller
                            name="telefon2"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <>
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  id="telefon2"
                                  type="text"
                                  placeholder="Telefon Numarası"
                                  {...field}
                                />

                                {errors.telefon2?.type == 'required' && (
                                  <p className="text-sm text-red-500">{lang.required}</p>
                                )}
                              </>
                            )}
                          />
                        </div>
                      </div>

                      <div className="md:flex w-full">
                        <div className="mb-4 w-full px-2">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="tahsil_edilecek_ucret"
                          >
                            Tahsil Edilecek Ücret
                          </label>
                          <Controller
                            name="tahsil_edilecek_ucret"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <>
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  id="tahsil_edilecek_ucret"
                                  type="text"
                                  placeholder="Tahsil Edilecek Ücret"
                                  {...field}
                                />

                                {errors.tahsil_edilecek_ucret?.type == 'required' && (
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
                            Tahsil Edilecek Para Birimi
                          </label>
                          <Controller
                            name="tahsil_edilecek_para_birimi"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <>
                                <select
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  id="tahsil_edilecek_para_birimi"
                                  {...field}
                                >
                                  <option value={_guncellenecekData.para_birimi}>
                                    {_guncellenecekData.para_birimi}
                                  </option>
                                </select>

                                {errors.tahsil_edilecek_para_birimi?.type == 'required' && (
                                  <p className="text-sm text-red-500">{lang.required}</p>
                                )}
                              </>
                            )}
                          />
                        </div>
                      </div>

                      <div className="md:flex w-full">
                        <div className="mb-4 w-full px-2">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="navlun_bedeli"
                          >
                            Navlun Bedeli
                          </label>
                          <Controller
                            name="navlun_bedeli"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <>
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  id="navlun_bedeli"
                                  type="text"
                                  placeholder="Navlun Bedeli"
                                  {...field}
                                />

                                {errors.navlun_bedeli?.type == 'required' && (
                                  <p className="text-sm text-red-500">{lang.required}</p>
                                )}
                              </>
                            )}
                          />
                        </div>
                        <div className="mb-4 w-full px-2">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="navlun_bedeli_para_birimi"
                          >
                            Navlun Bedeli Para Birimi
                          </label>
                          <Controller
                            name="navlun_bedeli_para_birimi"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <>
                                <select
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  id="navlun_bedeli_para_birimi"
                                  {...field}
                                >
                                  <option value={_guncellenecekData.navlun_bedeli_para_birimi}>
                                    {_guncellenecekData.navlun_bedeli_para_birimi}
                                  </option>
                                </select>

                                {errors.navlun_bedeli_para_birimi?.type == 'required' && (
                                  <p className="text-sm text-red-500">{lang.required}</p>
                                )}
                              </>
                            )}
                          />
                        </div>
                      </div>

                      <div className="md:flex w-full">
                        <div className="mb-4 w-full px-2">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="depo_teslim_tarihi"
                          >
                            Depo Teslim Tarihi
                          </label>
                          <Controller
                            name="depo_teslim_tarihi"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <>
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  id="depo_teslim_tarihi"
                                  type="date"
                                  placeholder="Depo Teslim Tarihi"
                                  {...field}
                                />

                                {errors.depo_teslim_tarihi?.type == 'required' && (
                                  <p className="text-sm text-red-500">{lang.required}</p>
                                )}
                              </>
                            )}
                          />
                        </div>
                        <div className="mb-4 px-2 w-full">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="aciklama"
                          >
                            Açıklama
                          </label>
                          <Controller
                            name="aciklama"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <>
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  id="aciklama"
                                  type="text"
                                  placeholder="Açıklama"
                                  {...field}
                                />

                                {errors.aciklama?.type == 'required' && (
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
                          Güncelle
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModalOpen(false)}
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

SiparisModal.propTypes = {
  setModalOpen: PropTypes.func,
  modalOpen: PropTypes.bool,
  elref: PropTypes.object,
}
