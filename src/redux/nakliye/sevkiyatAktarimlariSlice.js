import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'src/config/axios'
import config from '../../config/env'
import Cookies from 'js-cookie'

const initialState = {
  data: [],
  loading: false,
  error: null,
  message: null,
}

export const teslim_et = createAsyncThunk(
  'sevkiyatlar/teslim_et',
  async (params, { rejectWithValue }) => {
    try {
      let user = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')).user : null
      const response = await axios.post(`${config.url}/nakliyeci/siparisi-tamamla`, {
        payment_number: params.paymentNumber,
        user_id: user.id,
        tahsilat: params.tahsilat,
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
  },
  extraReducers: {
    [teslim_et.pending]: (state, action) => {
      state.loading = true
    },
    [teslim_et.fulfilled]: (state, action) => {
      state.message = 'teslimedildi'
      state.loading = false
      state.data = action.payload
    },
    [teslim_et.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})
export const { setMessage } = sevkiyatSlice.actions
export default sevkiyatSlice.reducer

// Selectors
export const aktarimSonuc = (state) => state.nakliye_aktarim.data
export const loading = (state) => state.nakliye_aktarim.loading
export const error = (state) => state.nakliye_aktarim.error
export const SelectMessage = (state) => state.nakliye_aktarim.message
