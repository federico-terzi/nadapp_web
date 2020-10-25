import { combineReducers } from "redux";
import authReducer from "./auth"
import profileReducer from "./profile"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer