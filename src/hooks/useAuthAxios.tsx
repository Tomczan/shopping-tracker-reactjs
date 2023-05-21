import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useCookies } from "react-cookie"
import useAuth from "./useAuth"

const baseURL = import.meta.env.VITE_BASE_URL

const useAuthAxios = () => {
  let authContext = useContext(AuthContext)
  const [cookies] = useCookies(["accessToken", "refreshToken"])
  const { refreshToken } = useAuth()
  let { updateUserContext, logoutUser } = useContext(AuthContext)

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${authContext.authToken}`,
    },
  })

  axiosInstance.interceptors.request.use(async (req) => {
    console.log("hey im here")
    if (!cookies.accessToken && cookies.refreshToken) {
      try {
        const response = await refreshToken(cookies.refreshToken)
        updateUserContext(response)
      } catch (error) {
        console.log(
          `Something went wrong with refresh token inside auth interceptor ${error}`
        )
        logoutUser()
      }
    }
    return req
  })

  return axiosInstance
}

export default useAuthAxios
