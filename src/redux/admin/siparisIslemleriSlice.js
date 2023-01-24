import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'src/config/axios'
import config from '../../config/env'
const initialState = {
  siparisler: [],
  siparis: {},
  loading: false,
  error: null,
  siparisTitle: 'Bekleyen Siparisler',
  kargoCount: {},
  updateCase: false,
  onaylaBtnName: 'Onayla',
  message: null,
  nakliyeIslemleriSelectMessageTitle: 'Nakliyeci Listesi',
  atanacakSiparisler: [],
}

// Ara Nakliyeciye atanacak siparisler
export const nakliyeciyeAtanacakSiparisler = createAsyncThunk(
  'siparis/nakliyeciyeAtanacakSiparisler',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${config.url}/admin/nakliyeciyeAtanacakSiparisler`, params)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const kargolar = createAsyncThunk(
  'siparisIslemleri/kargolar',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${config.url}/admin/kargolar`, {
        kargoStatus: params.kargoStatus,
        api_key: config.apiKey,
        page: params.page,
      })
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
export const kargoSayilari = createAsyncThunk(
  'siparisIslemleri/kargoSayilari',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${config.url}/admin/kargo-counts`, {
        api_key: config.apiKey,
      })
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
// Burada kargo onayı yapılıyor
export const kargoIslemleriUpdate = createAsyncThunk(
  'siparisIslemleri/kargoIslemleriUpdate',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${config.url}/admin/kargo-islemleri-update`, {
        api_key: config.apiKey,
        ...params,
      })
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
export const kagoIslemleriIptal = createAsyncThunk(
  'siparisIslemleri/kagoIslemleriIptal',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${config.url}/admin/kargo-iptal`, {
        api_key: config.apiKey,
        ...params,
      })
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
// Burada Kargo Onayı yapılıyor
export const kargoUpdate = createAsyncThunk(
  'siparisIslemleri/kargoUpdate',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${config.url}/admin/kargo-guncelle`, {
        api_key: config.apiKey,
        ...params,
      })
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const siparisIslemleriSlice = createSlice({
  name: 'siparisIslemleri',
  initialState,
  reducers: {
    setSiparisTitle: (state, action) => {
      state.siparisTitle = action.payload
    },
    setOnaylaBtnName: (state, action) => {
      state.onaylaBtnName = action.payload
    },
    setNakliyeIslemleriSelectMessage: (state, action) => {
      state.nakliyeIslemleriSelectMessageTitle = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(kargolar.fulfilled, (state, action) => {
      state.siparisler = action.payload
    })

    builder.addCase(kargoSayilari.fulfilled, (state, action) => {
      state.kargoCount = {
        bekleyenKargolar: action.payload.bekleyenKargolar,
        iptalEdilenKargolar: action.payload.iptalEdilenKargolar,
        onayBekleyenKargolar: action.payload.onayBekleyenKargolar,
      }
    })

    builder.addCase(kargoIslemleriUpdate.pending, (state, action) => {
      state.message = null
      state.loading = true
    })

    builder.addCase(kargoIslemleriUpdate.fulfilled, (state, action) => {
      state.message = action.payload.message
      state.loading = false
    })

    builder.addCase(kargoUpdate.pending, (state, action) => {
      state.message = null
      state.loading = true
    })

    builder.addCase(kargoUpdate.fulfilled, (state, action) => {
      state.message = action.payload.message
      state.loading = false
    })

    builder.addCase(kagoIslemleriIptal.pending, (state, action) => {
      state.message = null
      state.loading = true
    })

    builder.addCase(kagoIslemleriIptal.fulfilled, (state, action) => {
      state.message = action.payload.message
      state.loading = false
    })

    // Nakliyeciye atanacak siparisler
    builder.addCase(nakliyeciyeAtanacakSiparisler.fulfilled, (state, action) => {
      state.atanacakSiparisler = action.payload
    })
  },
})

export const {
  setSiparisTitle,
  setKargoBilgisi,
  setOnaylaBtnName,
  setNakliyeIslemleriSelectMessage,
} = siparisIslemleriSlice.actions

// Selectors
export const siparisTitle = (state) => state.s_islemleri.siparisTitle
export const siparisler = (state) => state.s_islemleri.siparisler
export const kargoCounts = (state) => state.s_islemleri.kargoCount
export const loading = (state) => state.s_islemleri.loading
export const selectOnaylaBtnName = (state) => state.s_islemleri.onaylaBtnName
export const selectMessage = (state) => state.s_islemleri.message
export const selectNakliyeIslemleriSelectMessage = (state) =>
  state.s_islemleri.nakliyeIslemleriSelectMessageTitle

export const selectAtacanakSiparisler = (state) => state.s_islemleri.atanacakSiparisler

export default siparisIslemleriSlice.reducer
