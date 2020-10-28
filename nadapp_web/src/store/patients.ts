import { createAsyncThunk, createReducer } from "@reduxjs/toolkit"
import axios from "axios"
import { BASIC_LOGIN_ENDPOINT, BASIC_LOGIN_VERIFY_ENDPOINT, generatePatientBalancesEndpoint, generatePatientDoctorsEndpoint, generatePatientMealsEndpoint, generatePatientProfileEndpoint, generatePatientReportsEndpoint, PATIENTS_ENDPOINT, PROFILE_INFO_ENDPOINT } from "../serverConfig"
import { logoutRequest } from "./auth"
import { handleRequestFailure, SessionError } from "./common"
import { redirectTo } from "./navigation"
import { RootState } from "./root"

export interface ShortPatientInfo {
  id: number,
  firstName: string,
  lastName: string,
}

export interface PatientProfile {
  id: number,
  firstName: string,
  lastName: string,
  CF: string,
  birthDate: string,
  telephone: string,
  email: string,
  address?: string,
  notes?: string, 
}

export interface MealEntry {
  uuid: string,
  date: string,
  meal: string
}

export interface BalanceEntry {
  uuid: string
  date: Date 
  minPressure?: number
  maxPressure?: number
  heartFrequency?: number
  weight?: number
  diuresis?: number
  osLiquids?: number
  fecesCount?: number
  fecesTexture?: string
  ostomyVolume?: number
  pegVolume?: number
  otherGastrointestinalLosses?: string
  parenteralNutritionVolume?: number
  otherIntravenousLiquids?: string
}

export interface ReportEntry {
  id: number,
  date: string,
}

export interface DoctorEntry {
  id: number,
  firstName: string,
  lastName: string,
  title?: string,
  publicTelephone?: string,
  email?: string,
  address?: string,
}


export interface PatientsState {
  shortPatientList: ShortPatientInfo[]

  currentPatientProfile: PatientProfile | null
  currentPatientMeals: MealEntry[]
  currentPatientBalances: BalanceEntry[]
  currentPatientReports: ReportEntry[]
  currentPatientDoctors: DoctorEntry[]
}

const initialState: PatientsState = {
  shortPatientList: [],
  currentPatientProfile: null,
  currentPatientMeals: [],
  currentPatientBalances: [],
  currentPatientReports: [],
  currentPatientDoctors: [],
}

export interface FetchPatientsListSuccess {
  shortPatientsList: ShortPatientInfo[]
}

export interface FetchPatientProfileSuccess {
  profile: PatientProfile
}

export interface FetchPatientMealsSuccess {
  meals: MealEntry[]
}

export interface FetchPatientBalancesSuccess {
  balances: BalanceEntry[]
}

export interface FetchPatientReportsSuccess {
  reports: ReportEntry[]
}

export interface FetchPatientDoctorsSuccess {
  doctors: DoctorEntry[]
}

// Actions

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(PATIENTS_ENDPOINT)
      return {
        shortPatientsList: response.data.patients
      } as FetchPatientsListSuccess 
    } catch (err) {
      console.log("fetchPatients error:", err.response.data)
      handleRequestFailure(dispatch, err)
      throw err 
    }
  })

export const fetchPatientProfile = createAsyncThunk(
  "patients/fetchPatientProfile",
  async (patientId: number, { dispatch }) => {
    try {
      const response = await axios.get(generatePatientProfileEndpoint(patientId))
      return {
        profile: response.data.info
      } as FetchPatientProfileSuccess 
    } catch (err) {
      console.log("fetchPatientProfile error:", err.response.data)
      handleRequestFailure(dispatch, err)
      throw err 
    }
  })

export const fetchPatientMeals = createAsyncThunk(
  "patients/fetchPatientMeals",
  async (patientId: number, { dispatch }) => {
    try {
      const response = await axios.get(generatePatientMealsEndpoint(patientId))
      return {
        meals: response.data.meals
      } as FetchPatientMealsSuccess 
    } catch (err) {
      console.log("fetchPatientMeals error:", err.response.data)
      handleRequestFailure(dispatch, err)
      throw err 
    }
  })

export const fetchPatientBalances = createAsyncThunk(
  "patients/fetchPatientBalances",
  async (patientId: number, { dispatch }) => {
    try {
      const response = await axios.get(generatePatientBalancesEndpoint(patientId))
      return {
        balances: response.data.balances
      } as FetchPatientBalancesSuccess 
    } catch (err) {
      console.log("fetchPatientBalances error:", err.response.data)
      handleRequestFailure(dispatch, err)
      throw err 
    }
  })

export const fetchPatientReports = createAsyncThunk(
  "patients/fetchPatientReports",
  async (patientId: number, { dispatch }) => {
    try {
      const response = await axios.get(generatePatientReportsEndpoint(patientId))
      return {
        reports: response.data.reports
      } as FetchPatientReportsSuccess 
    } catch (err) {
      console.log("fetchPatientReports error:", err.response.data)
      handleRequestFailure(dispatch, err)
      throw err 
    }
  })

export const fetchPatientDoctors = createAsyncThunk(
  "patients/fetchPatientDoctors",
  async (patientId: number, { dispatch }) => {
    try {
      const response = await axios.get(generatePatientDoctorsEndpoint(patientId))
      return {
        doctors: response.data.doctors
      } as FetchPatientDoctorsSuccess 
    } catch (err) {
      console.log("fetchPatientDoctors error:", err.response.data)
      handleRequestFailure(dispatch, err)
      throw err 
    }
  })


// Reducer
export default createReducer(initialState, (builder) => {
  builder
    .addCase(fetchPatients.pending, (state, action) => {
      console.log("fetch patients info requested")
    })
    .addCase(fetchPatients.fulfilled, (state, action) => {
      state.shortPatientList = action.payload.shortPatientsList
      console.log("fetch patients info completed")
    })
    .addCase(fetchPatients.rejected, (state, action) => {
      console.log("fetch patients info error", action.error)
    })
    .addCase(fetchPatientProfile.pending, (state, action) => {
      state.currentPatientProfile = null
      console.log("fetch patient profile requested")
    })
    .addCase(fetchPatientProfile.fulfilled, (state, action) => {
      state.currentPatientProfile = action.payload.profile
      console.log("fetch patient profile completed")
    })
    .addCase(fetchPatientProfile.rejected, (state, action) => {
      console.log("fetch patient profile error", action.error)
    })
    .addCase(fetchPatientMeals.pending, (state, action) => {
      state.currentPatientMeals = []
      console.log("fetch patient meals requested")
    })
    .addCase(fetchPatientMeals.fulfilled, (state, action) => {
      state.currentPatientMeals = action.payload.meals
      console.log("fetch patient meals completed")
    })
    .addCase(fetchPatientMeals.rejected, (state, action) => {
      console.log("fetch patient meals error", action.error)
    })
    .addCase(fetchPatientBalances.pending, (state, action) => {
      state.currentPatientBalances = []
      console.log("fetch patient balances requested")
    })
    .addCase(fetchPatientBalances.fulfilled, (state, action) => {
      state.currentPatientBalances = action.payload.balances
      console.log("fetch patient balances completed")
    })
    .addCase(fetchPatientBalances.rejected, (state, action) => {
      console.log("fetch patient balances error", action.error)
    })
    .addCase(fetchPatientReports.pending, (state, action) => {
      state.currentPatientReports = []
      console.log("fetch patient reports requested")
    })
    .addCase(fetchPatientReports.fulfilled, (state, action) => {
      state.currentPatientReports = action.payload.reports
      console.log("fetch patient reports completed")
    })
    .addCase(fetchPatientReports.rejected, (state, action) => {
      console.log("fetch patient reports error", action.error)
    })
    .addCase(fetchPatientDoctors.pending, (state, action) => {
      state.currentPatientDoctors = []
      console.log("fetch patient doctors requested")
    })
    .addCase(fetchPatientDoctors.fulfilled, (state, action) => {
      state.currentPatientDoctors = action.payload.doctors
      console.log("fetch patient doctors completed")
    })
    .addCase(fetchPatientDoctors.rejected, (state, action) => {
      console.log("fetch patient doctors error", action.error)
    })
})