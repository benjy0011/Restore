import { configureStore, legacy_createStore } from "@reduxjs/toolkit"
import counterReducer, { counterSlice } from "../../features/contact/counterReducer"
import { useDispatch, useSelector } from "react-redux"

// RTK
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
})


// For type safety purpose when using useDispatch and useSelector
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

// Legacy
export function configureTheStore() {
  return legacy_createStore(counterReducer)
}