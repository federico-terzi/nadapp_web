import { createAsyncThunk, createReducer } from "@reduxjs/toolkit"
import axios from "axios"
import { BASIC_LOGIN_ENDPOINT, BASIC_LOGIN_VERIFY_ENDPOINT, SPID_LOGIN_ENDPOINT } from "../serverConfig"
import { redirectTo } from "./navigation"
import { fetchProfileInfo } from "./profile"
import { RootState } from "./root"

export interface AuthState {
  // Basic login process
  basicLoginVerificationToken: string | null

  error: string | null
}

const initialState: AuthState = {
  basicLoginVerificationToken: null,
  error: null,
}

export interface BasicLoginRequestInfo {
  username: string,
  password: string,
}

export interface BasicLoginPhaseOneSuccess {
  verificationToken: string,
}

export interface BasicLoginVerifyRequestInfo {
  code: string,
}

// Actions

export const basicLoginRequested = createAsyncThunk(
  "auth/basicLoginRequest",
  async (loginInfo: BasicLoginRequestInfo) => {
    try {
      const response = await axios.post(BASIC_LOGIN_ENDPOINT, {
        username: `med@${loginInfo.username}`,
        password: loginInfo.password,
      })
      return {
        verificationToken: response.data.verify
      } as BasicLoginPhaseOneSuccess
    } catch (err) {
      console.log("basicLoginRequest error:", err.response.data)
      const errorMessage = err.response.data?.error ?? ""
      if (errorMessage === "user not found") {
        throw new LoginError("Utente non presente nel sistema")
      } else if (errorMessage === "invalid credentials") {
        throw new LoginError("Credenziali non corrette, riprova")
      }
      throw err
    }
  })

export const basicLoginVerifyRequested = createAsyncThunk(
  "auth/basicLoginVerifyRequest",
  async (verifyInfo: BasicLoginVerifyRequestInfo, { getState, dispatch }) => {
    try {
      const { auth: { basicLoginVerificationToken } } = getState() as RootState
      if (!basicLoginVerificationToken) {
        throw new LoginError("Errore: Codice di verifica inviato prima delle credenziali")
      }
      const response = await axios.post(BASIC_LOGIN_VERIFY_ENDPOINT, {
        code: verifyInfo.code,
        token: basicLoginVerificationToken
      })
      if (response.data.result === "ok") {
        dispatch(fetchProfileInfo())
        dispatch(redirectTo({
          path: "/",
          replace: true,
        }))

        return true
      } else {
        console.log(response.data)
        throw new LoginError("Il server ha restituito una risposta non valida")
      }
    } catch (err) {
      console.log("basicLoginVerifyRequest error:", err.response?.data)
      const errorMessage = err.response?.data?.error ?? ""
      if (errorMessage === "invalid token") {
        throw new LoginError("Il codice è scaduto, riprova")
      } else if (errorMessage === "invalid code") {
        throw new LoginError("Codice non corretto, riprova")
      }
      throw err
    }
  })

export const requestSpidLogin = createAsyncThunk(
  "auth/requestSpidLogin",
  async (spidToken: string, { dispatch }) => {
    try {
      const response = await axios.post(SPID_LOGIN_ENDPOINT, {
        token: spidToken 
      })
      if (response.data.result === "ok") {
        dispatch(fetchProfileInfo())
        dispatch(redirectTo({
          path: "/",
          replace: true,
        }))

        return true
      } else {
        console.log(response.data)
        throw new LoginError("Il server ha restituito una risposta non valida")
      }
    } catch (err) {
      console.log("spidLoginError error:", err.response?.data)
      const errorMessage = err.response?.data?.error ?? ""
      if (errorMessage === "invalid token") {
        throw new LoginError("Accesso non consentito, token non valido")
      }
      throw err
    }
  })

export const logoutRequest = createAsyncThunk(
  "auth/logoutRequest",
  async (_, { getState, dispatch }) => {
    dispatch(redirectTo({
      path: "/login",
      replace: true,
    }))
  })

// Reducer
export default createReducer(initialState, (builder) => {
  builder
    .addCase(basicLoginRequested.pending, (state, action) => {
      state.basicLoginVerificationToken = null
      console.log("basic login phase one requested")
    })
    .addCase(basicLoginRequested.fulfilled, (state, action) => {
      state.basicLoginVerificationToken = action.payload.verificationToken
      state.error = null
      console.log("basic login phase one completed")
    })
    .addCase(basicLoginRequested.rejected, (state, action) => {
      console.log("basic login phase one error", action.error)
      if (action.error.message) {
        state.error = action.error.message
      } else {
        state.error = "Impossibile completare la richiesta"
      }
    })
    .addCase(basicLoginVerifyRequested.pending, (state, action) => {
      console.log("basic login verify requested")
    })
    .addCase(basicLoginVerifyRequested.fulfilled, (state, action) => {
      state.error = null
      console.log("basic login completed")
    })
    .addCase(basicLoginVerifyRequested.rejected, (state, action) => {
      console.log("basic login phase two error", action.error)

      state.basicLoginVerificationToken = null
      if (action.error.message) {
        state.error = action.error.message
      } else {
        state.error = "Impossibile completare la richiesta"
      }
    })
    .addCase(requestSpidLogin.pending, (state, action) => {
      console.log("spid login requested")
    })
    .addCase(requestSpidLogin.fulfilled, (state, action) => {
      state.error = null
      console.log("spid login completed")
    })
    .addCase(requestSpidLogin.rejected, (state, action) => {
      console.log("spid login error", action.error)

      state.basicLoginVerificationToken = null
      if (action.error.message) {
        state.error = action.error.message
      } else {
        state.error = "Impossibile completare la richiesta"
      }
    })
    // .addCase(logoutRequest.fulfilled, (state, action) => {
    //   console.log("logout completed")
    // })
})

// Errors

class LoginError extends Error {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, LoginError.prototype);
  }
}