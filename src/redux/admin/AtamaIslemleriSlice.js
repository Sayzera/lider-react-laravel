import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'src/config/axios'
import config from 'src/config/env'

const initialState = {
  users: [],
  message: null,
}

/**
 * Kullanıcıları getirir
 */
export const fetchUsers = createAsyncThunk(
  'atama/fetchUsers',
  async (params, { rejectWithValue }) => {
    try {
      let { data } = await axios.post(config.url + '/admin/kullanici-getir', {
        type: params.type,
        table_name: params.table_name,
      })

      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const kullaniciAta = createAsyncThunk(
  'atama/kullaniciAta',
  async (params, { rejectWithValue }) => {
    try {
      let { data } = await axios.post(config.url + '/admin/kullanici-ata', {
        kargolar: params.selectedKargo,
        userId: params.userId,
        table_name: params.table_name,
      })

      return data
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const kargoAtamasiKaldir = createAsyncThunk(
  'atama/atamaKaldir',
  async (params, { rejectWithValue }) => {
    try {
      let { data } = await axios.post(config.url + '/admin/atama-kaldir', params)

      return data
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

const atamaSlice = createSlice({
  name: 'atama',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload
    })

    builder.addCase(kullaniciAta.pending, (state, action) => {
      state.message = null
    })

    builder.addCase(kullaniciAta.fulfilled, (state, action) => {
      state.message = 'Kullanıcı başarıyla atandı'
    })

    builder.addCase(kargoAtamasiKaldir.pending, (state, action) => {
      state.message = null
    })

    builder.addCase(kargoAtamasiKaldir.fulfilled, (state, action) => {
      state.message = 'Atama başarıyla kaldırıldı'
    })
  },
})

export const { setMessage } = atamaSlice.actions
export default atamaSlice.reducer

// Selectors
export const selectUsers = (state) => state.atama.users
export const selectMessage = (state) => state.atama.message
