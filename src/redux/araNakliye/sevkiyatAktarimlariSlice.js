import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'src/config/axios'
import config from '../../config/env'
import Cookies from 'js-cookie'

const initialState = {
  data: [],
  loading: false,
  error: null,
  message: null,
  fark_message: null,
}

export const urunleriAl = createAsyncThunk(
  'sevkiyatlar/urunleriAl',
  async (params, { rejectWithValue }) => {
    try {
      let user = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).user : null
      const response = await axios.post(`${config.url}/ara-nakliyeci/ara-nakliye/urunleri-al`, {
        payment_number: params.paymentNumber,
        parca_sayisi: params.parcaSayisi,
        user_id: user.id,
      })
      console.log(response.data)
      return response.data
    } catch (err) {
      rejectWithValue(err)
    }
  },
)

export const farklari_kabul_et = createAsyncThunk(
  'sevkiyatlar/farklari_kabul_et',
  async (params, { rejectWithValue }) => {
    try {
      let user = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).user : null
      const response = await axios.post(
        `${config.url}/ara-nakliyeci/ara-nakliye/farklari-kabul-et`,
        {
          payment_number: params.paymentNumber,
          parca_sayisi: params.parcaSayisi,
          user_id: user.id,
        },
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const depoya_aktar = createAsyncThunk(
  'sevkiyatlar/depoya_aktar',
  async (params, { rejectWithValue }) => {
    try {
      let user = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).user : null
      const response = await axios.post(`${config.url}/ara-nakliyeci/ara-nakliye/depoya-aktar`, {
        payment_number: params.paymentNumber,
        user_id: user.id,
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const sevkiyatSlice = createSlice({
  name: 'sevkiyat',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = null
    },
    setFarkMessage: (state, action) => {
      state.fark_message = null
    },
  },
  extraReducers: {
    [urunleriAl.pending]: (state, action) => {
      state.message = null
      state.loading = true
    },
    [urunleriAl.fulfilled]: (state, action) => {
      state.message = 'urunalindi'
      state.data = action.payload
    },
    [urunleriAl.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [farklari_kabul_et.pending]: (state, action) => {
      state.fark_message = null
    },
    [farklari_kabul_et.fulfilled]: (state, action) => {
      state.fark_message = 'farkonaylandi'
      state.data = action.payload
    },
    [farklari_kabul_et.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [depoya_aktar.pending]: (state, action) => {
      state.loading = true
    },
    [depoya_aktar.fulfilled]: (state, action) => {
      state.message = 'depoyaaktarildi'
      state.loading = false
      state.data = action.payload
    },
    [depoya_aktar.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})
export const { setMessage, setFarkMessage } = sevkiyatSlice.actions
export default sevkiyatSlice.reducer

// Selectors
export const aktarimSonuc = (state) => state.ara_nakliye_aktarim.data
export const loading = (state) => state.ara_nakliye_aktarim.loading
export const error = (state) => state.ara_nakliye_aktarim.error
export const SelectMessage = (state) => state.ara_nakliye_aktarim.message
export const SelectFarkMessage = (state) => state.ara_nakliye_aktarim.fark_message
