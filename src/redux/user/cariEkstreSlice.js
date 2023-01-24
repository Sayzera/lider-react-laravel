import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'src/config/axios'
import config from 'src/config/env'

const initalState = {
  cariEkstresi: [],
  isStokDetay: false,
  loading: false,
}

export const cariEkstre = createAsyncThunk(
  'cariEkstre/cariEkstre',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${config.url}/cari/ekstre-getir`, params)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const cariEkstreSlice = createSlice({
  name: 'cariEkstre',
  initialState: initalState,
  reducers: {
    setStokDetay(state, action) {
      state.isStokDetay = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(cariEkstre.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(cariEkstre.fulfilled, (state, action) => {
      state.loading = false
      state.cariEkstresi = action.payload
    })
  },
})

export const { setStokDetay } = cariEkstreSlice.actions
export default cariEkstreSlice.reducer

// Selectors
export const selectCariEkstresi = (state) => state.cariEkstre.cariEkstresi
export const selectIsStokDetay = (state) => state.cariEkstre.isStokDetay
export const selectLoading = (state) => state.cariEkstre.loading
