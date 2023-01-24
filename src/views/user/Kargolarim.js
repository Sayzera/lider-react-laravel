import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Durumlar from 'src/components/User/Durumlar'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import useScroll from 'src/hooks/useScroll'
import { useAuth } from 'src/hooks/auth'
import {
  kargolarimData,
  kargolarim,
  loading,
  kOnaylandimi,
  kIptalOldumu,
  iptal_et,
  kargo_sayilari_cek,
  setIptalOldumuState,
} from 'src/redux/user/kargo_islemleri'
import language from 'src/config/keywords'
import DataTable from 'react-data-table-component'
import SiparisIslemleriBtn from '../../components/User/SiparisDurumlari'
import SiparisModal from '../../components/User/Modals/SiparisModal'
import SiparisDuzenleModal from '../../components/User/Modals/SiparisDuzenleModal'
import AtamaModal from 'src/components/Admin/AtamaIslemleri/Modal'

function Kargolarim() {
  const [executeScroll, elref] = useScroll()
  const { user } = useAuth()
  const userData = user()
  const { durum } = useParams()
  const dispatch = useDispatch()
  const lang = language['tr']
  const kargolarimVeriler = useSelector(kargolarimData)
  const isLoading = useSelector(loading)
  const mOnaylandimi = useSelector(kOnaylandimi)
  const mIptalOldumu = useSelector(kIptalOldumu)
  const [kargoDurum, setKargoDurum] = React.useState('Bekleyen Kargolarım')
  const [openModal, setOpenModal] = React.useState(false)
  const [rowData, setRowData] = React.useState([])
  const [openGuncelleModal, setOpenGuncelleModal] = React.useState(false)
  const [guncelleData, setGuncelleData] = React.useState([])

  // İptal Nedeni Modal
  const [openIptalNedeniModal, setOpenIptalNedeniModal] = React.useState(false)
  const [iptalNedeniData, setIptalNedeniData] = React.useState()

  // Kullanıcının tıkladı row bilgilere ulaşmak için
  const [iptalEdilenKargoId, setIptalEdilenKargoId] = React.useState()

  // sipariş iptal edildi mi ?

  const navigate = useNavigate()
  const ModalVeriler = (gelenRow) => {
    setOpenModal(true)
    setRowData(gelenRow)
  }
  const columns = [
    {
      name: 'Kargo Bilgileri',
      wrap: true,
      width: '250px',
      selector: (row) => {
        return (
          <div>
            <button
              onClick={() => {
                ModalVeriler(row)
                executeScroll()
                setOpenGuncelleModal(false)
              }}
              className="border p-2 rounded-lg bg-gray-300"
              style={{
                cursor: 'pointer',
              }}
            >
              Kargo Bilgilerini Görüntüle
            </button>
          </div>
        )
      },
    },
    {
      name: 'İsim',
      wrap: true,
      width: '150px',
      selector: (row) => (
        <div>
          <p className="mb-2">{row.teslim_alacak_kisi} </p>
        </div>
      ),
    },

    {
      name: 'Tahmini Teslim Tarihi',
      wrap: true,
      width: '150px',
      selector: (row) => (
        <div>
          <p className="mb-2">{row.tahmini_teslim_tarihi} </p>
        </div>
      ),
    },
    {
      name: 'Sevk Ücreti',
      wrap: true,
      width: '150px',
      selector: (row) => (
        <div>
          <p className="mb-2" title="Teklif Edilen Tutar">
            {row.teslimat_ucreti} {row.teslimat_para_birimi}
          </p>
        </div>
      ),
    },
    {
      name: 'İşlemler',
      wrap: true,
      width: '430px',
      selector: (row) => (
        <div>
          <SiparisIslemleriBtn
            row={row}
            setOpenGuncelleModal={setOpenGuncelleModal}
            setGuncelleData={setGuncelleData}
            executeScroll={executeScroll}
            kargoBilgileriModal={setOpenModal}
            setOpenIptal={setOpenIptalNedeniModal}
            openIptal={openIptalNedeniModal}
            setIptalEdilenKargoId={setIptalEdilenKargoId}
          />
        </div>
      ),
    },
  ]

  React.useEffect(() => {
    executeScroll()
    if (durum && durum != 1 && durum != 2 && durum != 3) {
      navigate('/user/dashboard')
    }

    if (durum && durum == 1) {
      setKargoDurum('Bekleyen Kargolarım')
    } else if (durum == 2) {
      setKargoDurum('Onaylanan Kargolarım')
    } else if (durum == 3) {
      setKargoDurum('İptal Kargolarım')
    }

    dispatch(
      kargolarim({
        kargoStatus: durum,
      }),
    )

    console.log('work')
  }, [durum, mIptalOldumu])
  return (
    <>
      <Durumlar setModalOpen={setOpenModal} />
      {/* 
        iptal nedeni modal için kullanıldı
      */}
      <AtamaModal
        title="İptal Nedeni ? "
        setOpen={setOpenIptalNedeniModal}
        open={openIptalNedeniModal}
      >
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          onChange={(e) => {
            setTimeout(() => {
              setIptalNedeniData(e.target.value)
            }, 500)
          }}
          placeholder="İptal Nedeniniz"
        />

        <button
          className=" w-full mt-2 bg-blue-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            dispatch(
              iptal_et({
                id: iptalEdilenKargoId.id,
                iptal_nedeni: iptalNedeniData,
              }),
            )
            dispatch(
              kargolarim({
                kargoStatus: 1,
              }),
            )

            setOpenIptalNedeniModal(false)
          }}
        >
          İptal Et
        </button>
      </AtamaModal>

      <div>
        <SiparisModal
          modalOpen={openModal}
          setModalOpen={setOpenModal}
          data={rowData}
          elref={elref}
        />
        <SiparisDuzenleModal
          modalOpen={openGuncelleModal}
          setModalOpen={setOpenGuncelleModal}
          elref={elref}
        />

        {mOnaylandimi ? (
          <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-emerald-500">
            <span className="inline-block align-middle mr-8">
              <b className="capitalize">Başarılı !</b> {lang.kargo_onaylama.basarili}
            </span>
          </div>
        ) : null}

        {mOnaylandimi == 2 ? (
          <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
            <span className="inline-block align-middle mr-8">
              <b className="capitalize">Hata !</b> {lang.kargo_onaylama.hata}
            </span>
          </div>
        ) : null}

        {mIptalOldumu ? (
          <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-emerald-500">
            <span className="inline-block align-middle mr-8">
              <b className="capitalize">Başarılı !</b>
              {lang.kargo_iptal.basarili}
            </span>
          </div>
        ) : null}

        {mIptalOldumu == 2 ? (
          <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
            <span className="inline-block align-middle mr-8">
              <b className="capitalize">Hata !</b> {lang.kargo_iptal.hata}
            </span>
          </div>
        ) : null}
        <DataTable
          title={kargoDurum}
          selectableRows={false}
          selectableRowsHighlight={true}
          onSelectedRowsChange={(rows) => console.log(rows)}
          columns={columns}
          data={kargolarimVeriler}
          progressPending={isLoading}
          pagination
          paginationServer
          key={1}
          paginationTotalRows="10"
        />
      </div>
    </>
  )
}

export default Kargolarim
