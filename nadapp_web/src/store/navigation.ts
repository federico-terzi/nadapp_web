import { createAsyncThunk } from "@reduxjs/toolkit"
import { appHistory } from "../history"

export interface RedirectTo {
  path: string,
  replace: boolean,
}

// Actions

export const redirectTo = createAsyncThunk(
  "navigation/redirectTo",
  async (redirectTo: RedirectTo) => {
    if (redirectTo.replace) {
      appHistory.replace(redirectTo.path)
    } else {
      appHistory.push(redirectTo.path)
    }
  })