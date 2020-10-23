import { createAsyncThunk, createReducer } from "@reduxjs/toolkit"
import axios from "axios"
import { BASIC_LOGIN_ENDPOINT } from "../serverConfig"

export interface AuthState {
  sessionToken: string | null

  // Basic login process
  basicLoginVerificationToken: string | null
}

const initialState: AuthState = {
  sessionToken: null,
  basicLoginVerificationToken: null
}

export interface BasicLoginRequestInfo {
  username: string,
  password: string,
}

export interface BasicLoginPhaseOneSuccess {
  verificationToken: string,
}

// Actions

export const basicLoginRequested = createAsyncThunk(
  "auth/basicLoginRequest", 
  async (loginInfo: BasicLoginRequestInfo, thunkAPI) => {
    try {
      const response = await axios.post(BASIC_LOGIN_ENDPOINT, loginInfo)
      return {
        verificationToken: response.data.verify
      } as BasicLoginPhaseOneSuccess
    } catch (err) {
      console.log("basicLoginRequest error:", err.response.data)
      throw err
    }
  })

// Reducer
export default createReducer(initialState, (builder) => {
  builder
    .addCase(basicLoginRequested.pending, (state, action) => {
      state.basicLoginVerificationToken = null
      console.log("basic login requested")
    })
    .addCase(basicLoginRequested.fulfilled, (state, action) => {
      state.basicLoginVerificationToken = action.payload.verificationToken
      console.log("basic login completed")
    })
    .addCase(basicLoginRequested.rejected, (state, action) => {
      console.log("basic login phase one error", action.error)
      // TODO: dispatch error metadata
    })
})