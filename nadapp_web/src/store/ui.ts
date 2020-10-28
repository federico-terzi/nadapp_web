import { createAction, createReducer } from "@reduxjs/toolkit"

export interface UIState {
  snackbarMessage: string | null
}

const initialState: UIState = {
  snackbarMessage: null
}

// Actions

export const showSnackbar = createAction<string>("ui/showSnackbar")
export const hideSnackbar = createAction("ui/hideSnackbar")

// Reducer
export default createReducer(initialState, (builder) => {
  builder
    .addCase(showSnackbar, (state, action) => {
      console.log("show snackbar", action.payload)
      state.snackbarMessage = action.payload
    })
    .addCase(hideSnackbar, (state, action) => {
      console.log("hide snackbar")
      state.snackbarMessage = null
    })
})