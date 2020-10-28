import { createAsyncThunk, createReducer } from "@reduxjs/toolkit"
import axios from "axios"
import { BASIC_LOGIN_ENDPOINT, BASIC_LOGIN_VERIFY_ENDPOINT, PROFILE_INFO_ENDPOINT } from "../serverConfig"
import { logoutRequest } from "./auth"
import { SessionError } from "./common"
import { redirectTo } from "./navigation"
import { RootState } from "./root"

export interface DoctorInfo {
  username?: string,
  firstName: string
  lastName: string
  telephone?: string
  email?: string
  title?: string
  CF?: string
  publicTelephone?: string
  address?: string
  notes?: string
}

export interface ProfileState {
  info: DoctorInfo | null
}

const initialState: ProfileState = {
  info: null
}

export interface FetchProfileInfoSuccess {
  info: DoctorInfo
}

// Actions

export const fetchProfileInfo = createAsyncThunk(
  "profile/fetchInfo",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(PROFILE_INFO_ENDPOINT)
      return {
        info: response.data.info
      } as FetchProfileInfoSuccess
    } catch (err) {
      console.log("fetchProfileInfo error:", err.response.data)
      if (err.response.status === 401) {
        dispatch(logoutRequest())
      }
      throw err
    }
  })

// Reducer
export default createReducer(initialState, (builder) => {
  builder
    .addCase(fetchProfileInfo.pending, (state, action) => {
      state.info = null
      console.log("fetch profile info requested")
    })
    .addCase(fetchProfileInfo.fulfilled, (state, action) => {
      state.info = action.payload.info
      console.log("fetch profile info completed")
    })
    .addCase(fetchProfileInfo.rejected, (state, action) => {
      console.log("fetch profile info error", action.error)
    })
})