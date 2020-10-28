import { createAsyncThunk, createReducer } from "@reduxjs/toolkit"
import axios from "axios"
import { DOCTORS_ENDPOINT, generateDoctorProfileEndpoint } from "../serverConfig"
import { handleRequestFailure } from "./common"

export interface ShortDoctorInfo {
  id: number,
  title?: string,
  firstName: string,
  lastName: string,
}

export interface DoctorProfile {
  id: number,
  firstName: string,
  lastName: string,
  title?: string,
  publicTelephone?: string,
  email?: string,
  address?: string,
}

export interface DoctorsState {
  shortDoctorList: ShortDoctorInfo[]

  currentDoctorProfile: DoctorProfile | null
}

const initialState: DoctorsState = {
  shortDoctorList: [],
  currentDoctorProfile: null,
}

export interface FetchDoctorListSuccess {
  shortDoctorList: ShortDoctorInfo[]
}

export interface FetchDoctorProfileSuccess {
  profile: DoctorProfile 
}

// Actions

export const fetchDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(DOCTORS_ENDPOINT)
      return {
        shortDoctorList: response.data.doctors
      } as FetchDoctorListSuccess 
    } catch (err) {
      console.log("fetchDoctors error:", err.response.data)
      handleRequestFailure(dispatch, err)
      throw err
    }
  })

export const fetchDoctorProfile = createAsyncThunk(
  "doctors/fetchDoctorProfile",
  async (doctorId: number, { dispatch }) => {
    try {
      const response = await axios.get(generateDoctorProfileEndpoint(doctorId))
      return {
        profile: response.data.info
      } as FetchDoctorProfileSuccess 
    } catch (err) {
      console.log("fetchDoctorProfile error:", err.response.data)
      handleRequestFailure(dispatch, err)
      throw err
    }
  })

// Reducer
export default createReducer(initialState, (builder) => {
  builder
    .addCase(fetchDoctors.pending, (state, action) => {
      console.log("fetch doctors requested")
    })
    .addCase(fetchDoctors.fulfilled, (state, action) => {
      state.shortDoctorList = action.payload.shortDoctorList
      console.log("fetch doctors completed")
    })
    .addCase(fetchDoctors.rejected, (state, action) => {
      console.log("fetch doctors error", action.error)
    })
    .addCase(fetchDoctorProfile.pending, (state, action) => {
      state.currentDoctorProfile = null
      console.log("fetch doctors profile requested")
    })
    .addCase(fetchDoctorProfile.fulfilled, (state, action) => {
      state.currentDoctorProfile = action.payload.profile
      console.log("fetch doctors profile completed")
    })
    .addCase(fetchDoctorProfile.rejected, (state, action) => {
      console.log("fetch doctors profile error", action.error)
    })
})