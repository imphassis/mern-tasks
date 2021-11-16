import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'user',
  initialState: {
    logged: false,
    info: null,
  },
  reducers: {
    login: (state, action) => {
      state.info = action.payload;
      state.logged = true;
    },
    logout: (state, action) => {
      state.info = null;
      state.logged = false;
    },
  },
});
export default slice.reducer;
// Actions
export const { login, logout } = slice.actions;
