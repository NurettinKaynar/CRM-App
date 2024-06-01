import axios from "axios";
import { AuthModel } from "./_models";
import { ApiUrls } from "../../../utilities/ApiService";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `${ApiUrls.BASE_URL}${ApiUrls.LOGIN}`;
export const REGISTER_URL = `${ApiUrls.BASE_URL}${ApiUrls.REGISTER}`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

export function login(email: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    email,
    password,
  });
}

// Server should return AuthModel
export function register(
  email: string,
  name: string,
  surname: string,
  password: string
) {
  return axios.post(REGISTER_URL, {
    email,
    name: name,
    surname: surname,
    password: password,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}
