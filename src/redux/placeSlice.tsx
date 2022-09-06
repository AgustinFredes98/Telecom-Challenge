import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { place_extended_information, store_initial_information } from "../types"

const initialState = {} as store_initial_information

const weatherSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setCurrentInformation(state, action: PayloadAction<place_extended_information>) {
      state.current = {...state.current, ...action.payload}
      return state
    },
    setlocalPlace(state, action: PayloadAction<string>) {
      state.localCurrentPlace = action.payload
      return state
    },
    setFutureInformation(state, action: PayloadAction<place_extended_information>) {
      state.future = {...state.future, ...action.payload}
      return state
    },
  },
})

export const { setCurrentInformation, setFutureInformation, setlocalPlace } = weatherSlice.actions
export default weatherSlice.reducer