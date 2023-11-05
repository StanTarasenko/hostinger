// Modules
import { createSlice } from '@reduxjs/toolkit';

interface LanguageState {
  value: string;
};

const initialState: LanguageState = {
  value: '',
};

const langSlice = createSlice({
  name: 'Language',
  initialState,
  reducers: {
    addLang(state, action) {
      state.value = action.payload;
    }
  }
})

export const { addLang } = langSlice.actions;
export default langSlice.reducer;
