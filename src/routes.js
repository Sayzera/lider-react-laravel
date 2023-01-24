import React from 'react'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

/**
 * Admin
 */
const Admin = React.lazy(() => import('./views/admin/Dashboard'))
const KullaniciEkle = React.lazy(() => import('./views/admin/KullaniciEkle'))
const Nakliyeciler = React.lazy(() => import('./views/admin/Nakliyeciler'))
const AraNakliyeciListesi = React.lazy(() => import('./views/admin/AraNakliyeci'))
const Depocular = React.lazy(() => import('./views/admin/Depocular'))
const MusteriListesi = React.lazy(() => import('./views/admin/MusteriListesi'))
const AdminCariEkstre = React.lazy(() => import('./views/admin/CariEkstresi'))
// Atama işlemleri
const DepocuAtama = React.lazy(() => import('./views/admin/Atama/DepocuAtama'))
const AraNakiyeciAtama = React.lazy(() => import('./views/admin/Atama/AraNakliyeciAtama'))
const NakliyeciAtama = React.lazy(() => import('./views/admin/Atama/NakliyeciAtama'))

// Atama Yönetimi
const AraNakliyeciAtama = React.lazy(() => import('./views/admin/AtamaYonetimi/AraNakliyeciAtama'))
const TirciAtama = React.lazy(() => import('./views/admin/AtamaYonetimi/TirciAtama'))

// Kargo Durumları
const KargoDurumlari = React.lazy(() => import('./views/admin/KargoDurumlari'))

// Sevkiyat işlemleri
const SevkiyatIslemleri = React.lazy(() => import('./views/admin/SevkiyatDurumlari'))

/**
 * Kullanıcı
 */

const KullaniciDashboard = React.lazy(() => import('./views/user/Dashboard'))
const KullaniciKargolarim = React.lazy(() => import('./views/user/Kargolarim'))
const KullaniciKargomVar = React.lazy(() => import('./views/user/KargomVar'))
const KullaniciQrKodGoruntule = React.lazy(() => import('./views/user/QrKodGoruntule'))
const KullaniciSevkiyatDurumlari = React.lazy(() => import('./views/user/SevkiyatDurumlari'))
const CariEkstresi = React.lazy(() => import('./views/user/CariEkstre'))

/**
 * Ara Nakliyeci
 */

const AraNakliyeciDashboard = React.lazy(() => import('./views/araNakliyeci/Dashboard'))
const AraNakliyeciSevkiyatIslemleri = React.lazy(() =>
  import('./views/araNakliyeci/SevkiyatIslemleri'),
)

/**
 * Depocu
 */

const DepocuDashboard = React.lazy(() => import('./views/depocu/Dashboard'))
const DepodakiPaketler = React.lazy(() => import('./views/depocu/DepodakiPaketler'))
const DepocuKullaniciQrKodGoruntule = React.lazy(() => import('./views/depocu/qr-kod'))

// Nakliyeci
const NakliyeciDashboard = React.lazy(() => import('./views/nakliyeci/Dashboard'))
const NakliyeciSevkiyatIslemleri = React.lazy(() => import('./views/nakliyeci/SevkiyatIslemleri'))
const NakliyeciQrKodGoruntule = React.lazy(() => import('./views/nakliyeci/qr-kod'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // Admin
  { path: '/admin/dashboard', name: 'Admin', element: Admin, type: 999 },
  { path: '/admin/kullanici-ekle', name: 'Kullanıcı Ekle', element: KullaniciEkle, type: 999 },
  { path: '/admin/nakliyeciler', name: 'Nakliyeciler', element: Nakliyeciler, type: 999 },
  {
    path: '/admin/aranakliyeci-atama',
    name: 'Ara Nakliyeci Atama',
    element: AraNakliyeciAtama,
    type: 999,
  },

  {
    path: '/admin/aranakliyeciler',
    name: 'Ara Nakliyeci Listesi',
    element: AraNakliyeciListesi,
    type: 999,
  },
  {
    path: '/admin/musteri-listesi',
    name: 'Müşteri Listesi',
    element: MusteriListesi,
    type: 999,
  },
  { path: '/admin/depocular', name: 'Depocular', element: Depocular, type: 999 },
  // Admin Atama işlemleri
  { path: '/admin/atama/:id/:title', name: 'Atama', element: DepocuAtama, type: 999 },
  {
    path: '/admin/aranakliyeci-atama/:id/:title',
    name: 'Ara Nakliyeci Atama',
    element: AraNakiyeciAtama,
    type: 999,
  },
  {
    path: '/admin/nakliyeci-atama',
    name: 'Nakliyeci Atama',
    element: TirciAtama,
    type: 999,
  },
  // Kargo Durumları
  {
    path: '/admin/kargo-durumlari/:id',
    name: 'Kargo Durumları',
    element: KargoDurumlari,
    type: 999,
  },
  {
    path: '/admin/nakliyeci-atama/:id/:title',
    name: 'Nakliyeci Atama',
    element: NakliyeciAtama,
    type: 999,
  },

  // Admin Sevkiyat İşlemleri
  {
    path: '/admin/sevkiyat-durumlari/:durum',
    name: 'Sevkiyat İşlemleri',
    element: SevkiyatIslemleri,
    type: 999,
  },
  {
    path: '/admin/cari-ekstre/:carikod',
    name: 'Cari Ekstre',
    element: AdminCariEkstre,
    type: 999,
  },

  // Kullanıcı
  { path: '/user/dashboard', name: 'Kontrol Paneli', element: KullaniciDashboard, type: 0 },
  { path: '/user/kargolarim/:durum', name: 'Kargolarım', element: KullaniciKargolarim, type: 0 },
  { path: '/user/kargom-var', name: 'Kargolarım', element: KullaniciKargomVar, type: 0 },
  {
    path: '/user/qrkod-goruntule/:paymentNumber',
    name: 'QR Kod Görüntüle',
    element: KullaniciQrKodGoruntule,
    type: 0,
  },
  {
    path: '/user/sevkiyat-durumlari/:durum',
    name: 'Kargolarım',
    element: KullaniciSevkiyatDurumlari,
    type: 0,
  },
  {
    path: '/user/cari-ekstresi',
    name: 'Cari Ekstre',
    element: CariEkstresi,
    type: 0,
  },

  // Ara Nakliyeci
  {
    path: '/araNakliyeci/dashboard',
    name: 'Kontrol Paneli',
    element: AraNakliyeciDashboard,
    type: 1,
  },
  {
    path: '/araNakliyeci/sevkiyat-islemleri/:durum',
    name: 'Sevkiyat İşlemleri',
    element: AraNakliyeciSevkiyatIslemleri,
    type: 1,
  },

  // Depocu
  { path: '/depocu/dashboard', name: 'Kontrol Paneli', element: DepocuDashboard, type: 3 },
  {
    path: '/depocu/depodaki-paketler',
    name: 'Depodaki Paketler',
    element: DepodakiPaketler,
    type: 3,
  },
  {
    path: '/depocu/qrkod-goruntule/:paymentNumber',
    name: 'QR Kod Görüntüle',
    element: DepocuKullaniciQrKodGoruntule,
    type: 3,
  },

  // Nakliyeci
  { path: '/nakliyeci/dashboard', name: 'Kontrol Paneli', element: NakliyeciDashboard, type: 2 },
  {
    path: '/nakliyeci/sevkiyat-islemleri/:durum',
    name: 'Sevkiyat İşlemleri',
    element: NakliyeciSevkiyatIslemleri,
    type: 2,
  },
  {
    path: '/nakliyeci/qrkod-goruntule/:paymentNumber',
    name: 'QR Kod Görüntüle',
    element: NakliyeciQrKodGoruntule,
    type: 2,
  },
]

export default routes
