import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'src/config/axios'
import config from '../../config/env'
import Cookies from 'js-cookie'

const initialState = {
  data: [],
  sevkiyatSayilari: [],
  loading: false,
  error: null,
  user: Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).user : null,
}

export const getSevkiyatlar = createAsyncThunk(
  'sevkiyatlar/getSevkiyatlar',
  async (params, { rejectWithValue }) => {
    try {
      let user = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).user : null
      const response = await axios.post(`${config.url}/ara-nakliyeci/get_sevkiyatlar`, {
        sevkiyatStatus: params.sevkiyatStatus,
        user_id: user.id,
      })
      return response.data
    } catch (err) {
      rejectWithValue(err)
    }
  },
)

export const sevkiyat_sayilarini_cek = createAsyncThunk(
  'sevkiyatlar/sevkiyat_sayilarini_cek',
  async (params, { rejectWithValue }) => {
    try {
      let user = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).user : null
      const { data } = await axios.post(`${config.url}/ara-nakliyeci/sevkiyat_sayilari`, {
        user_id: user.id,
      })
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const sevkiyatSlice = createSlice({
  name: 'sevkiyat',
  initialState,
  reducers: {},
  extraReducers: {
    [getSevkiyatlar.pending]: (state, action) => {
      state.loading = true
    },
    [getSevkiyatlar.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    [getSevkiyatlar.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [sevkiyat_sayilarini_cek.pending]: (state, action) => {
      state.loading = true
    },
    [sevkiyat_sayilarini_cek.fulfilled]: (state, action) => {
      state.loading = false
      state.sevkiyatSayilari = action.payload
    },
    [sevkiyat_sayilarini_cek.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export default sevkiyatSlice.reducer

// Selectors
export const sevkiyatlar = (state) => state.ara_nakliye_sevkiyat.data
export const SevkiyatSayilari = (state) => state.ara_nakliye_sevkiyat.sevkiyatSayilari
export const loading = (state) => state.ara_nakliye_sevkiyat.loading
export const error = (state) => state.ara_nakliye_sevkiyat.error
