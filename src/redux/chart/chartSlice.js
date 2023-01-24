import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'src/config/axios'
import config from 'src/config/env'
const initialState = {
  adminChartData: [],
}

const fetchAdminChartData = createAsyncThunk(
  'chart/fetchAdminChartData',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(config.url + '/admin/chart-genel-datalar', params)
      return data
    } catch (e) {
      rejectWithValue(e)
    }
  },
)

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAdminChartData.fulfilled, (state, action) => {
      state.adminChartData = action.payload
    })
  },
})

export default chartSlice.reducer

// Selectors
const selectAdminChartData = (state) => state.adminChart.adminChartData

// Actions
export const chartActions = {
  ...chartSlice.actions,
  fetchAdminChartData,
  selectAdminChartData,
}
