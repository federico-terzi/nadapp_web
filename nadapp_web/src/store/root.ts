import { combineReducers } from "redux";
import authReducer from "./auth"
import profileReducer from "./profile"
import patientsReducer from "./patients"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  patients: patientsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer