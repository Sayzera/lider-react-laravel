import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPuzzle,
  cilSpeedometer,
  cilHistory,
  cilAccountLogout,
  cilBell,
  cilTruck,
  cilUser,
  cilFolderOpen,
  cilHouse,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

/**
 * admin: 999
 * kullanıcı : 0
 * aranakliyeci : 1
 * depocu: 2
 * tırcı : 3
 */
const _nav = [
  /**
   * admin
   */
  {
    component: CNavItem,
    name: 'Anasayfa',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '999',
  },

  {
    component: CNavItem,
    name: 'Sevkiyat Durumları',
    to: '/admin/sevkiyat-durumlari/1',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '999',
  },

  {
    component: CNavItem,
    name: 'Kargo Durumları',
    to: '/admin/kargo-durumlari/1',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '999',
  },

  {
    component: CNavGroup,
    name: 'Kullanici İşlemleri',
    to: '/base',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Kullanıcı Oluştur',
        to: '/admin/kullanici-ekle',
      },
      {
        component: CNavItem,
        name: 'Nakliyeci Listesi',
        to: '/admin/nakliyeciler',
      },
      {
        component: CNavItem,
        name: 'Ara Nakliyeci Listesi',
        to: '/admin/aranakliyeciler',
      },
      {
        component: CNavItem,
        name: 'Depocu Listesi',
        to: '/admin/depocular',
      },
    ],
    type: '999',
  },
  {
    component: CNavGroup,
    name: 'Atama Yönetimi',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Nakliyeci Atama',
        to: '/admin/nakliyeci-atama',
      },
      {
        component: CNavItem,
        name: 'Ara Nakliyeci Atama',
        to: '/admin/aranakliyeci-atama',
      },
    ],
    type: '999',
  },
  {
    component: CNavItem,
    name: 'Müşteri Listesi',
    to: '/admin/musteri-listesi',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '999',
  },

  {
    component: CNavItem,
    name: 'Çıkış Yap',
    to: '/user/logout',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '999',
  },

  /**
   * kullanıcı
   */
  {
    component: CNavItem,
    name: 'Anasayfa',
    to: '/user/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '0',
  },
  {
    component: CNavItem,
    name: 'Kargom Var',
    to: '/user/kargom-var',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '0',
  },
  {
    component: CNavItem,
    name: 'Kargolarım',
    to: '/user/kargolarim/1',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '0',
  },
  {
    component: CNavItem,
    name: 'Sevkiyat Durumları',
    to: '/user/sevkiyat-durumlari/1',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '0',
  },

  {
    component: CNavItem,
    name: 'Cari Ekstresi',
    to: '/user/cari-ekstresi',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '0',
  },

  {
    component: CNavItem,
    name: 'Çıkış Yap',
    to: '/user/logout',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '0',
  },

  /**
   * aranakliyeci
   */
  {
    component: CNavItem,
    name: 'Anasayfa',
    to: '/araNakliyeci/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '1',
  },
  {
    component: CNavItem,
    name: 'Sevkiyat İşlemleri',
    to: '/araNakliyeci/sevkiyat-islemleri/1',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '1',
  },
  {
    component: CNavItem,
    name: 'Çıkış Yap',
    to: '/user/logout',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '1',
  },

  /**
   * depocu
   */
  {
    component: CNavItem,
    name: 'Anasayfa',
    to: '/depocu/dashboard',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '3',
  },
  {
    component: CNavItem,
    name: 'Depodaki Paketler',
    to: '/depocu/depodaki-paketler',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '3',
  },
  {
    component: CNavItem,
    name: 'Çıkış Yap',
    to: '/user/logout',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '3',
  },

  /**
   * tırcı
   */
  {
    component: CNavItem,
    name: 'Anasayfa',
    to: '/nakliyeci/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '2',
  },
  {
    component: CNavItem,
    name: 'Sevkiyat İşlemleri',
    to: '/nakliyeci/sevkiyat-islemleri/1',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '2',
  },
  {
    component: CNavItem,
    name: 'Çıkış Yap',
    to: '/user/logout',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
    type: '2',
  },
]

export default _nav
