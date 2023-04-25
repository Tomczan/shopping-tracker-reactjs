import axios from "axios"
import jwt_decode from "jwt-decode"
import dayjs from "dayjs"
import { AuthTokensType } from "../context/AuthContext"

const baseURL = "http://127.0.0.1:8000/"

let localStorageTokens = localStorage.getItem("authTokens")
let authTokens: AuthTokensType = localStorageTokens
  ? JSON.parse(localStorageTokens)
  : null

const axiosInstance = axios.create({
    baseURL,
    headers:{Authorization: `Bearer ${authTokens.access}`}
})