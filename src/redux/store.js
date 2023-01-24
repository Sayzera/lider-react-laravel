import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import kargoReducer from './user/kargo_islemleri'
import sevkiyatReducer from './user/sevkiyat_islemleri'
import siparisIslemleriReducer from './admin/siparisIslemleriSlice'
import kullaniciIslemleriSlice from './admin/kullaniciIslemleriSlice'
import sideBarSlice from './sideBarSlice'
import AtamaIslemleriSlice from './admin/AtamaIslemleriSlice'
import AraNakliyeSevkiyatReducer from './araNakliye/sevkiyatDurumlariSlice'
import AraNakliyeAktarimReducer from './araNakliye/sevkiyatAktarimlariSlice'
import depocuSlice from './depocu/depocuSlice'
import NakliyeSevkiyatReducer from './nakliye/sevkiyatDurumlariSlice'
import NakliyeAktarimReducer from './nakliye/sevkiyatAktarimlariSlice'
import qrOkuyucuSlice from './QrOkuyucu/qrOkuyucuSlice'
import chartSlice from './chart/chartSlice'
import cariEkstreSlice from './user/cariEkstreSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    kargo: kargoReducer,
    s_islemleri: siparisIslemleriReducer,
    k_islemleri: kullaniciIslemleriSlice,
    sidebar: sideBarSlice,
    atama: AtamaIslemleriSlice,
    sevkiyat: sevkiyatReducer,
    ara_nakliye_sevkiyat: AraNakliyeSevkiyatReducer,
    ara_nakliye_aktarim: AraNakliyeAktarimReducer,
    depocu: depocuSlice,
    nakliye_sevkiyat: NakliyeSevkiyatReducer,
    nakliye_aktarim: NakliyeAktarimReducer,
    qrReader: qrOkuyucuSlice,
    adminChart: chartSlice,
    cariEkstre: cariEkstreSlice,
  },
})
