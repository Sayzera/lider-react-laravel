import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'src/config/axios'
import config from 'src/config/env'

const initialState = {
  data: [],
  message: null,
  kargodakiPaketler: [],
}

export const fetchDepodakiKargolar = createAsyncThunk(
  'depocu/fetchDepodakiKargolar',
  async (params, { rejectWithValue }) => {
    let { data } = await axios.post(config.url + '/depocu/depodaki-paketler', params)
    return data
  },
)

export const kargodakiPaketleriGetir = createAsyncThunk(
  'depocu/kargodakiPaketleriGetir',
  async (params, { rejectWithValue }) => {
    let { data } = await axios.post(config.url + '/depocu/kargodaki-paketler', params)
    return data
  },
)

export const tiraYukle = createAsyncThunk(
  'depocu/tiraYukle',
  async (params, { rejectWithValue }) => {
    let { data } = await axios.post(config.url + '/depocu/tira-yukle', params)
    console.log(data)
    return data
  },
)

export const paketlerdekiBarkodlarOkundumu = createAsyncThunk(
  'depocu/paketlerdekiBarkodlarOkundumu',
  async (params, { rejectWithValue }) => {
    let { data } = await axios.post(config.url + '/depocu/paketlerdeki-barkodlar-okundumu', params)
    return data
  },
)

export const depodakiPaketlereNotEkle = createAsyncThunk(
  'depocu/depodakiPaketlereNotEkle',
  async (params, { rejectWithValue }) => {
    let { data } = await axios.post(config.url + '/depocu/paketlere-not-ekle', params)
    return data
  },
)

const depocuSlice = createSlice({
  name: 'depocu',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDepodakiKargolar.fulfilled, (state, action) => {
      state.data = action.payload
    })

    builder.addCase(kargodakiPaketleriGetir.fulfilled, (state, action) => {
      state.kargodakiPaketler = action.payload
    })

    builder.addCase(depodakiPaketlereNotEkle.pending, (state, action) => {
      state.message = null
    })

    builder.addCase(depodakiPaketlereNotEkle.fulfilled, (state, action) => {
      state.message = 'Not eklendi'
    })

    builder.addCase(tiraYukle.pending, (state, action) => {
      state.message = null
    })

    builder.addCase(tiraYukle.fulfilled, (state, action) => {
      state.message = 'Tira yüklendi'
    })

    builder.addCase(paketlerdekiBarkodlarOkundumu.pending, (state, action) => {
      state.message = null
    })

    builder.addCase(paketlerdekiBarkodlarOkundumu.fulfilled, (state, action) => {
      state.message = action.payload.message
    })
  },
})

// Selectors
export const SelectDepodakiKargolar = (state) => state.depocu.data
export const SelectKargodakiPaketler = (state) => state.depocu.kargodakiPaketler
export const SelectMessage = (state) => state.depocu.message

export const { setMessage } = depocuSlice.actions
export default depocuSlice.reducer
