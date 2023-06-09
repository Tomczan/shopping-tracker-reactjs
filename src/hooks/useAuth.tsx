import useCookies from "react-cookie/cjs/useCookies"
import axiosInstance from "../hooks/useAxios"
import jwt_decode from "jwt-decode"
import { AuthTokensType } from "../types/AuthTokens"



const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ])

  const obtainToken = (
    login: string,
    password: string
  ): Promise<AuthTokensType> => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("api/token/", {
          username: login,
          password: password,
        })
        .then((response) => {
          if (response.status === 200) {
            let tokens = response.data
            resolve(tokens)
          } else {
            reject("Failed to fetch User")
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const refreshToken = (refreshToken: string): Promise<AuthTokensType> => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("api/token/refresh/", {
          refresh: refreshToken,
        })
        .then((response) => {
          if (response.status === 200) {
            let tokens = response.data
            resolve(tokens)
          } else {
            reject("Failed to refresh token")
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const setAccessTokenCookie = (accessToken: string): void => {
    let decodedToken: any = jwt_decode(accessToken)
    let tokenExpDate = new Date(decodedToken.exp * 1000)
    setCookie("accessToken", accessToken, {
      expires: tokenExpDate,
      path: "/",
    })
  }

  const setRefreshTokenCookie = (refreshToken: string): void => {
    let decodedRefreshToken: any = jwt_decode(refreshToken)
    let refreshTokenExpDate = new Date(decodedRefreshToken.exp * 1000)
    setCookie("refreshToken", refreshToken, {
      expires: refreshTokenExpDate,
      path: "/",
    })
  }

  const removeJwtCookies = () => {
    removeCookie("accessToken")
    removeCookie("refreshToken")
  }

  return {
    obtainToken,
    refreshToken,
    setAccessTokenCookie,
    setRefreshTokenCookie,
    removeJwtCookies,
  }
}

export default useAuth
