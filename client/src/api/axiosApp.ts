import axios from "axios"

const axiosApp = axios
axiosApp.defaults.withCredentials = true

export { axiosApp }