export const BASIC_LOGIN_ENDPOINT = "/auth/basic/login"
export const BASIC_LOGIN_VERIFY_ENDPOINT = "/auth/basic/verify"
export const PROFILE_INFO_ENDPOINT = "/api/med/info"
export const PATIENTS_ENDPOINT = "/api/med/patients"
export const generatePatientProfileEndpoint = (patientId: number) => `/api/med/patients/${patientId}/info`
export const generatePatientMealsEndpoint = (patientId: number) => `/api/med/patients/${patientId}/meals`
export const generatePatientBalancesEndpoint = (patientId: number) => `/api/med/patients/${patientId}/balances`
export const generatePatientReportsEndpoint = (patientId: number) => `/api/med/patients/${patientId}/reports`
export const generatePatientReportDownloadEndpoint = (patientId: number, reportId: number) => `/api/med/patients/${patientId}/reports/${reportId}/download`
export const generatePatientReportUploadEndpoint = (patientId: number) => `/api/med/patients/${patientId}/reports/upload`
export const generatePatientDoctorsEndpoint = (patientId: number) => `/api/med/patients/${patientId}/doctors`