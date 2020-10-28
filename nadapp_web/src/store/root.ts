import { combineReducers } from "redux";
import authReducer from "./auth"
import profileReducer from "./profile"
import patientsReducer from "./patients"
import doctorsReducer from "./doctors"
import uiReducer from "./ui"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  patients: patientsReducer,
  doctors: doctorsReducer,
  ui: uiReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer