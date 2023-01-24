import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'src/config/axios'
import config from '../../config/env'
import Cookies from 'js-cookie'
const initialState = {
  loading: false,
  error: null,
  data: [],
  kargolarim: [],
  guncellenecekKargoDatalari: {},
  guncellendimi: false,
  onaylandimi: false,
  kargoSayilari: [],
  iptaloldumu: false,
  kargoBilgileri: [],
  user: Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).user : null,
  sehirler: [],
  ilceler: [],
  isOk: false,
}

export const kargom_var = createAsyncThunk(
  'kargo/kargom_var',
  async (parms, { rejectWithValue }) => {
    try {
      let user = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).user : null
      const { data } = await axios.post(`${config.url}/user/kargom_var`, {
        parms,
        user_id: user.id,
      })
      return data
    } catch (e) {
      rejectWithValue(e)
    }
  },
)

export const kargolarim = createAsyncThunk(
  'kargo/kargolarim',
  async (params, { rejectWithValue }) => {
    try {
      let user = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).user : null
      const { data } = await axios.post(`${config.url}/user/kargolari-getir`, {
        kargoStatus: params.kargoStatus,
        api_key: config.apiKey,
        user_id: user.id,
      })
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const kargo_guncelle = createAsyncThunk(
  'kargo/kargo_guncelle',
  async (params, { rejectWithValue }) => {
    try {
      let user = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).user : null
      const { data } = await axios.post(`${config.url}/user/kargo_guncelle`, {
        data: params,
        api_key: config.apiKey,
        user_id: user.id,
      })
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const kargo_bilgileri_getir = createAsyncThunk(
  'kargo/kargo_bilgileri_getir',
  async (params, { rejectWithValue }) => {
    try {
      let user = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).user : null
      const { data } = await axios.post(`${config.url}/user/kargo_bilgilerini_getir`, {
        data: params,
        api_key: config.apiKey,
        user_id: user.id,
      })
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const kargo_onayla = createAsyncThunk(
  'kargo/kargo_onayla',
  async (params, { rejectWithValue }) => {
    try {
      let user = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).user : null
      const { data } = await axios.post(`${config.url}/user/kargo_onayla`, {
        data: params.id,
        api_key: config.apiKey,
        user_id: user.id,
      })
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const sehirler = createAsyncThunk('kargo/sehirler', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${config.url}/sehirler`, params)
    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const ilceler = createAsyncThunk('kargo/ilceler', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${config.url}/ilceler`, params)
    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const iptal_et = createAsyncThunk('kargo/iptal_et', async (params, { rejectWithValue }) => {
  try {
    let user = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).user : null
    const { data } = await axios.post(`${config.url}/user/iptal_et`, {
      data: params.id,
      api_key: config.apiKey,
      user_id: user.id,
      iptal_nedeni: params.iptal_nedeni,
    })
    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const kargo_sayilari_cek = createAsyncThunk(
  'kargo/kargo_sayilari',
  async (params, { rejectWithValue }) => {
    try {
      let user = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).user : null
      const { data } = await axios.post(`${config.url}/user/kargo_sayilari`, {
        api_key: config.apiKey,
        user_id: user.id,
      })
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const kargoSlice = createSlice({
  name: 'kargo',
  initialState,
  reducers: {
    setGuncellenecekData: (state, action) => {
      state.guncellenecekKargoDatalari = action.payload
      state.guncellendimi = false
    },
    setOnaylandimiState: (state, action) => {
      state.onaylandimi = false
    },
    setIptalOldumuState: (state, action) => {
      state.iptaloldumu = false
    },
    setIsOkState: (state, action) => {
      state.isOk = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(kargolarim.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(kargolarim.fulfilled, (state, action) => {
      state.kargolarim = action.payload.data
      state.loading = false
    })

    builder.addCase(kargo_bilgileri_getir.pending, (state, action) => {
      state.loading = true
    })

    builder.addCase(kargo_bilgileri_getir.fulfilled, (state, action) => {
      state.kargoBilgileri = action.payload.data
      state.loading = false
    })

    builder.addCase(kargo_bilgileri_getir.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })

    builder.addCase(kargo_guncelle.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.guncellendimi = true
      } else {
        state.guncellendimi = false
      }
    })

    builder.addCase(kargo_onayla.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.onaylandimi = true
      } else {
        state.onaylandimi = false
      }
    })

    builder.addCase(iptal_et.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.iptaloldumu = true
      } else {
        state.iptaloldumu = false
      }
    })

    builder.addCase(kargom_var.pending, (state, action) => {
      state.loading = true
      state.isOk = false
    })
    builder.addCase(kargom_var.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading = false
      state.isOk = true
    })

    builder.addCase(kargom_var.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })

    builder.addCase(kargo_sayilari_cek.fulfilled, (state, action) => {
      state.kargoSayilari = action.payload
    })

    // sehirler
    builder.addCase(sehirler.fulfilled, (state, action) => {
      state.sehirler = action.payload
    })

    // ilceler
    builder.addCase(ilceler.fulfilled, (state, action) => {
      state.ilceler = action.payload
    })
  },
})

export const { setGuncellenecekData, setOnaylandimiState, setIptalOldumuState, setIsOkState } =
  kargoSlice.actions
export default kargoSlice.reducer

// Selectors
export const kargo = (state) => state.kargo.data
export const loading = (state) => state.kargo.loading
export const error = (state) => state.kargo.error
export const kargolarimData = (state) => state.kargo.kargolarim
export const gData = (state) => state.kargo.guncellenecekKargoDatalari
export const VeriGuncellendimi = (state) => state.kargo.guncellendimi
export const kOnaylandimi = (state) => state.kargo.onaylandimi
export const kSayilari = (state) => state.kargo.kargoSayilari
export const kIptalOldumu = (state) => state.kargo.iptaloldumu
export const kBilgileri = (state) => state.kargo.kargoBilgileri

export const selectSehirler = (state) => state.kargo.sehirler
export const selectIlceler = (state) => state.kargo.ilceler
export const selectIsOk = (state) => state.kargo.isOk
