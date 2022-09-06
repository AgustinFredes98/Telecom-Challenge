import { configureStore } from "@reduxjs/toolkit";
import placeSlice from "./placeSlice"

export const storage = configureStore({
  reducer: {
    placeSlice
  }
})

export type AppDispatch = typeof storage.dispatch
export type RootState = ReturnType<typeof storage.getState>;