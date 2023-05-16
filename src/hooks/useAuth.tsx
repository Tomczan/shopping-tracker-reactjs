import useCookies from "react-cookie/cjs/useCookies"
import axiosInstance from "../utils/axiosInstance"
import jwt_decode from "jwt-decode"

export type AuthTokensType = {
  refresh: string
  access: string
}

const useAuth = () => {
  const [cookies, setCookie] = useCookies(["token", "refreshToken"])

  const fetchUser = (
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
  const setTokensCookies = (tokens: AuthTokensType): void => {
    // token cookie
    let decodedToken: any = jwt_decode(tokens.access)
    let tokenExpDate = new Date(decodedToken.exp * 1000)
    setCookie("token", tokens.access, {
      expires: tokenExpDate,
      path: "/",
    })
    // refresh token cookie
    let decodedRefreshToken: any = jwt_decode(tokens.refresh)
    let refreshTokenExpDate = new Date(decodedRefreshToken.exp * 1000)
    setCookie("refreshToken", tokens.refresh, {
      expires: refreshTokenExpDate,
      path: "/",
    })
  }
  return { fetchUser, setTokensCookies }
}

export default useAuth
