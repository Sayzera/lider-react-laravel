import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'src/config/axios'
import config from 'src/config/env'

const initialState = {
  kullaniciEkleModal: false,
  kullaniciGetirModal: null,
  message: null,
  customers: [],
}

export const getCustomers = createAsyncThunk(
  'kullaniciIslemleri/getCustomers',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${config.url}/admin/customers`, {
        params,
      })
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  },
)

export const createUser = createAsyncThunk(
  'kullaniciIslemleri/createUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(config.url + '/admin/create-user', data)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  },
)

export const updateUser = createAsyncThunk(
  'kullaniciIslemleri/updateUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(config.url + '/admin/update-user', data)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  },
)

export const deleteUser = createAsyncThunk(
  'kullaniciIslemleri/deleteUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(config.url + '/admin/delete-user', {
        data,
      })
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  },
)

const kullaniciIslemleriSlice = createSlice({
  name: 'kullaniciIslemleri',
  initialState,
  reducers: {
    kullaniciEkleModalAc: (state) => {
      state.kullaniciEkleModal = true
    },
    kullaniciEkleModalKapat: (state) => {
      state.kullaniciEkleModal = false
    },

    setKullaniciGetirModal: (state, action) => {
      state.kullaniciGetirModal = action.payload
    },

    setMessage: (state, action) => {
      state.message = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state, action) => {
      state.message = null
    })

    builder.addCase(createUser.fulfilled, (state, action) => {
      state.message = action.payload.message
    })

    builder.addCase(updateUser.pending, (state, action) => {
      state.message = 'Kullanıcı başarıyla güncellendi'
    })

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.message = null
    })

    builder.addCase(deleteUser.pending, (state, action) => {
      state.message = 'İşlem Başarıyla Gerçekleşti'
    })

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.message = null
    })

    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.customers = action.payload
    })
  },
})

export const { kullaniciEkleModalAc, kullaniciEkleModalKapat, setKullaniciGetirModal, setMessage } =
  kullaniciIslemleriSlice.actions

export default kullaniciIslemleriSlice.reducer

// Selectors
export const selectKullaniciEkleModal = (state) => state.k_islemleri.kullaniciEkleModal
export const selectKullaniciGetirModal = (state) => state.k_islemleri.kullaniciGetirModal
export const selectMessage = (state) => state.k_islemleri.message
export const selectCustomers = (state) => state.k_islemleri.customers
