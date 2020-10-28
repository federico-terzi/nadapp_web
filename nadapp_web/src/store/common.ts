import { RootDispatch } from "..";
import { logoutRequest } from "./auth";
import { showSnackbar } from "./ui";

export class SessionError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "SessionError"
    Object.setPrototypeOf(this, SessionError.prototype);
  }
}

type RequestError = {
  response?: {
    status: number
  }
}

export const handleRequestFailure = (dispatch: RootDispatch, error: RequestError) => {
  if (error.response) {
    if (error.response.status === 401) {
      dispatch(showSnackbar("Sessione scaduta"))
      dispatch(logoutRequest())
    } else if (error.response.status === 403) {
      dispatch(showSnackbar("Non possiedi i permessi necessari per completare l'operazione"))
    } else if (error.response.status === 404) {
      dispatch(showSnackbar("Oggetto non trovato"))
    }
  }
}