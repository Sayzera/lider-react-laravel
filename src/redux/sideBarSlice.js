import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    set: (state, action) => {
      state.sidebarShow = action.payload
    },
    setUnfoldable: (state, action) => {
      state.sidebarUnfoldable = action.payload
    },
  },
})

export const { set, setUnfoldable } = sidebarSlice.actions
export default sidebarSlice.reducer
