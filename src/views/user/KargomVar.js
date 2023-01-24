import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import language from 'src/config/keywords'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

import {
  kargom_var,
  kargo,
  sehirler,
  selectSehirler,
  selectIlceler,
  ilceler,
  setIsOkState,
  selectIsOk,
} from 'src/redux/user/kargo_islemleri'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from 'src/hooks/auth'

function KargomVar() {
  const [gidecegiAdres, setGidecegiAdres] = useState(null)

  const { user } = useAuth()

  const userInfo = user()

  const dispatch = useDispatch()
  const kargo_data = useSelector(kargo)

  const isOk = useSelector(selectIsOk)

  const dataSehirler = useSelector(selectSehirler)
  const dataIlceler = useSelector(selectIlceler)

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

    dispatch(kargom_var(newData))
  }

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(setIsOkState(false))
    }, 3000)
    if (kargo_data?.success == 1) {
      reset({
        k_parca_sayisi: '',
        k_metre_kup: '',
        gidecegi_adres: '',
        teslim_alacak_kisi: '',
        email: '',
        telefon: '',
        telefon2: '',
        tahsil_edilecek_ucret: '',
        depo_teslim_tarihi: '',
        aciklama: '',
        tahsil_edilecek_para_birimi: '',
        tedarikci_tel: '',
        tedarikci_adres: '',
        tedarikci_unvan: '',
        navlun_bedeli: '',
        navlun_bedeli_para_birimi: '',
      })

      resetField()
    }

    dispatch(sehirler())

    dispatch(
      ilceler({
        sehir_id: 16,
      }),
    )
  }, [kargo_data, isOk])

  const [value, setValue] = useState(null)

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white z-0 p-8">
      <div></div>
      {isOk ? (
        <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-emerald-500">
          <span className="inline-block align-middle mr-8">
            <b className="capitalize">Başarılı !</b> {lang.kargom_var.basarili}
          </span>
        </div>
      ) : null}

      {kargo_data && kargo_data?.success == 0 ? (
        <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
          <span className="inline-block align-middle mr-8">
            <b className="capitalize">Hata !</b> {lang.kargom_var.hata}
          </span>
        </div>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex w-full">
          <div className="mb-4 w-full px-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="k_parca_sayisi">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="k_metre_kup">
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
                    type="text"
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gidecegi_adres">
            Gideceği Adres
          </label>
          {/* <div>
            <GooglePlacesAutocomplete
              apiKey=""
              selectProps={{
                gidecegiAdres,
                onChange: (val) => {
                  console.log(val)
                  setGidecegiAdres(val)
                },
              }}
            />
          </div> */}
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefon">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefon2">
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

        <div
          className="md:flex w-full"
          style={{
            display: userInfo.kargom_var_param == '1' ? 'block' : 'none',
          }}
        >
          <div
            className="mb-4 w-full px-2"
            style={{
              display: userInfo.kargom_var_param == '1' ? 'block' : 'none',
            }}
          >
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
              defaultValue={0}
              render={({ field }) => (
                <>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="tahsil_edilecek_ucret"
                    type="number"
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

          <div
            className="mb-4 w-full px-2"
            style={{
              display: userInfo.kargom_var_param == '1' ? 'block' : 'none',
            }}
          >
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
              defaultValue={'EUR'}
              render={({ field }) => (
                <>
                  <input
                    type={'text'}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="tahsil_edilecek_para_birimi"
                    readOnly
                    {...field}
                  />

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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aciklama">
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

        <div className="md:flex w-full">
          <div className="mb-4 w-full px-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tahsil_edilecek_ucret"
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
              defaultValue={'EUR'}
              render={({ field }) => (
                <>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="navlun_bedeli_para_birimi"
                    {...field}
                    readOnly
                    type={'text'}
                  />

                  {errors.navlun_bedeli_para_birimi?.type == 'required' && (
                    <p className="text-sm text-red-500">{lang.required}</p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div
          className="border border-gray-500 p-2 rounded mb-2"
          style={{
            display: userInfo.kargom_var_param == '1' ? 'block' : 'none',
          }}
        >
          <div>
            <h1 className="text-xl mb-3 px-2 border-b max-w-fit">Kargom Nerden Teslim Alınacak</h1>
          </div>
          <div className="md:flex w-full">
            <div className="mb-4 w-full px-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="k_parca_sayisi"
              >
                Telefon
              </label>
              <Controller
                name="tedarikci_tel"
                control={control}
                defaultValue={userInfo.kargom_var_param == '1' ? '' : '000000'}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      id="tedarikci_tel"
                      placeholder="Telefon"
                      {...field}
                    />
                    {errors.tedarikci_tel?.type == 'required' && (
                      <p className="text-sm text-red-500">{lang.required}</p>
                    )}
                  </>
                )}
              />
            </div>

            <div className="mb-4 w-full px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="k_metre_kup">
                Kargocu Adı
              </label>
              <Controller
                name="tedarikci_unvan"
                control={control}
                defaultValue={userInfo.kargom_var_param == '1' ? '' : '...'}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="tedarikci_unvan"
                      type="text"
                      placeholder="Kargocu Adı"
                      {...field}
                    />

                    {errors.tedarikci_unvan?.type == 'required' && (
                      <p className="text-sm text-red-500">{lang.required}</p>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div className=" w-full">
            <div className="mb-4 w-full px-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="k_parca_sayisi"
              >
                Alınacak Adres
              </label>
              <Controller
                name="tedarikci_adres"
                control={control}
                defaultValue={userInfo.kargom_var_param == '1' ? '' : '...'}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      id="tedarikci_adres"
                      placeholder="Alınacak Adres"
                      {...field}
                    />
                    {errors.tedarikci_adres?.type == 'required' && (
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
                        const id = e.target.options[e.target.selectedIndex].getAttribute('data-id')
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
                            <option selected key={index} value={item.isim} data-id={item.il_no}>
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
                        const id = e.target.options[e.target.selectedIndex].getAttribute('data-id')
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
                            <option data-id={item.ilce_no} key={item.isim} value={item.isim}>
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
        </div>

        <div className="mb-4">
          <button
            className="w-full bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
          >
            Gönder
          </button>
        </div>
      </form>
    </div>
  )
}

export default KargomVar
