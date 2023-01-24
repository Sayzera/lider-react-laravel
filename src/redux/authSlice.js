import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import axios from 'axios'
import config from '../config/env'
const initalState = {
  user: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : [],
  isError: false,
  isAuthInfo: null,
  isAuth: false,
  isRegister: false,
  registerData: [],
}

export const isLogin = createAsyncThunk('auth/isLogin', async (data, { rejectWithValue }) => {
  const { email, password } = data

  try {
    const { data } = await axios.post('/api/user/login', {
      email,
      password,
    })
    if (data.success) {
      console.log('dd', data)
      return data
    } else {
      return []
    }
  } catch (e) {
    rejectWithValue(e)
  }
})

export const register = createAsyncThunk('auth/register', async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${config.url}/register`, {
      params,
    })
    console.log('Redux Sonuç', data)
    return data
  } catch (e) {
    rejectWithValue(e)
  }
})

export const isAuth = createAsyncThunk('auth/isAuth', async (data, { rejectWithValue }) => {
  try {
    let user = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : []

    if (user && user.token) {
      const { data } = await axios.post(
        '/api/user/auth',
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
      return data
    } else {
      return null
    }
  } catch (e) {
    rejectWithValue(e)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: initalState,
  reducers: {
    setRegisterData: (state, action) => {
      state.registerData = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(isLogin.pending, (state, action) => {
      state.isError = false
    })

    builder.addCase(isLogin.fulfilled, (state, action) => {
      if (!action.payload) {
        state.isError = true
      } else {
        state.user = action.payload

        Cookies.set('userInfo', JSON.stringify(action.payload))
      }
    })

    builder.addCase(isAuth.fulfilled, (state, action) => {
      state.isAuthInfo = action.payload
      state.isAuth = true
    })

    builder.addCase(isAuth.rejected, (state, action) => {
      state.isAuthInfo = null
      state.isAuth = false
      Cookies.remove('userInfo')
    })

    builder.addCase(register.fulfilled, (state, action) => {
      state.registerData = action.payload
      state.isRegister = true
    })
  },
})

export const { setRegisterData } = authSlice.actions

// Selectors
export const auth = (state) => state.auth.user
export const isError = (state) => state.auth.isError

// Kullanıcının giriş yapıp yapmadığını kontrol eder
export const userInfo = (state) => state.auth.isAuthInfo

export const isAuthInfo = (state) => state.auth.isAuth

export const registerData = (state) => state.auth.registerData

export default authSlice.reducer
