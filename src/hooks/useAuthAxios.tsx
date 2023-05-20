import axios from "axios"
import jwt_decode from "jwt-decode"
import dayjs from "dayjs"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const baseURL = import.meta.env.VITE_BASE_URL

const useAuthAxios = () => {
  let authContext = useContext(AuthContext)

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${authContext.authToken}`,
    },
  })

  axiosInstance.interceptors.request.use(async (req) => {
    console.log("hey im here")
    if (!authContext.authToken) {
    }
    return req
  })

  return axiosInstance
}

export default useAuthAxios
