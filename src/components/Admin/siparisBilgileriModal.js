import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import ReactToPrint from 'react-to-print'
import { cilPrint } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

export default function Modal({ setModalOpen, modalOpen, data, _kargoRef }) {
  const navigate = useNavigate()
  const dataTableRef = useRef()

  return (
    <>
      {modalOpen ? (
        <>
          <div ref={_kargoRef} className="" id="kargoBilgileriModal">
            <div className="">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <div className="flex flex-row items-center justify-between w-full">
                    <h3 className="text-3xl font-semibold">Kargo Bilgileri</h3>
                    <ReactToPrint
                      trigger={() => (
                        <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row' }}>
                          <CIcon icon={cilPrint} customClassName="nav-icon" width={25} />
                          <span style={{ cursor: 'pointer', marginLeft: '3px' }}>Yazdır</span>
                        </div>
                      )}
                      content={() => dataTableRef.current}
                    />
                  </div>
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
                <div className="px-2 " ref={dataTableRef}>
                  {data.kargo_iptal_nedeni != null && (
                    <div>
                      <p
                        className="bg-red-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Kargo İptal Nedeni : {data.kargo_iptal_nedeni}
                      </p>
                    </div>
                  )}

                  <p
                    className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Parça Sayısı : {data.kargo_parca_sayisi}
                  </p>

                  <p className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Kaç Metre Küp : {data.metrekup}
                  </p>
                  <p className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Adres : {data.adres}
                  </p>
                  <p className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Teslim Alacak Kişi : {data.teslim_alacak_kisi}
                  </p>
                  <p className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Alıcı Telefon : {data.telefon}
                  </p>
                  <p className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Alıcı 2. Telefon : {data.telefon_2}
                  </p>
                  <p className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold   px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Alıcı E Posta : {data.mail_adresi}
                  </p>
                  <p className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Tahsil Edilecek Ücret : {data.tahsil_ucret}
                  </p>
                  <p className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Tahsil Edilecek Para Birimi : {data.para_birimi}
                  </p>
                  <p className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Teslim Tarihi : {data.teslim_tarihi}
                  </p>

                  <p className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Açıklama : {data.aciklama}
                  </p>

                  <p className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Navlun Bedeli : {data.navlun_bedeli}
                  </p>

                  <p className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Navlun Bedeli Para Birimi : {data.navlun_bedeli_para_birimi}
                  </p>

                  <p
                    className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Kargocu Adresi : {data.tedarikci_adres}
                  </p>

                  <p className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    <span className="font-bold">İl/İlçe:</span> {data.sehirAdi} / {data.ilceAdi}
                  </p>

                  <p className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Kargocu Telefon: {data.tedarikci_tel}
                  </p>
                  <p className="bg-emerald-500 w-full text-white active:bg-emerald-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Kargocu Adı : {data.tedarikci_unvan}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setModalOpen(false)
                    }}
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

Modal.propTypes = {
  setModalOpen: PropTypes.func,
  modalOpen: PropTypes.bool,
  data: PropTypes.object,
  _kargoRef: PropTypes.object,
}
