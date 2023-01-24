import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import config from 'src/config/env'
import axios from 'src/config/axios'

const initialState = {
  isReadQr: false,
  message: null,
}

export const qrOkut = createAsyncThunk('qrOkuyucu/qrOkut', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${config.url}/qr/qr-kod-oku`, payload)
    console.log('qrOkut', data)
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const qrOkuyucuSlice = createSlice({
  name: 'qrOkuyucu',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(qrOkut.pending, (state, action) => {
      state.isReadQr = false
      state.message = null
    })
    builder.addCase(qrOkut.fulfilled, (state, action) => {
      state.isReadQr = true
      state.message = action.payload.message
    })
  },
})

export const { setMessage } = qrOkuyucuSlice.actions
export default qrOkuyucuSlice.reducer

// Selector
export const selectMessage = (state) => state.qrReader.message
