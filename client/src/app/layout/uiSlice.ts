import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const getSystemThemePreference = (): boolean => 
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

const getInitialDarkMode = (): boolean => {
  const storedDarkMode = localStorage.getItem('darkMode');
  return storedDarkMode 
    ? JSON.parse(storedDarkMode)
    : getSystemThemePreference();
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false,
    darkMode: getInitialDarkMode(),
    isMobile: false,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    toggleDarkMode: (state) => {
      localStorage.setItem('darkMode', JSON.stringify(!state.darkMode));
      state.darkMode = !state.darkMode;
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
  }
});

export const {
  startLoading,
  stopLoading,
  toggleDarkMode,
  setIsMobile,
} = uiSlice.actions