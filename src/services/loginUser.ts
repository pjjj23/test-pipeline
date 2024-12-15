import api from "@/api";
import { ACCESS_TOKEN, OFFLINE_URL, ONLINE_URL, REFRESH_TOKEN, ROLE } from "@/constants";
import { LoginFormData } from "@/schemas/login-schema";
import { getRoleFromToken } from "@/lib/jwtHelper";
import { AxiosError, AxiosResponse } from "axios";

const react_env = import.meta.env.VITE_REACT_ENV;
const mode = react_env === "development" ? "offline" : "online";


const saveTokenToLocalStorage = (
  data: AxiosResponse<any, any>,
  email: string
) => {
  localStorage.setItem(ACCESS_TOKEN, data.data.access);
  localStorage.setItem(REFRESH_TOKEN, data.data.refresh);
  localStorage.setItem(ROLE, getRoleFromToken(data.data.access));
  localStorage.setItem("email", email);
};


export const loginUser = async (data: LoginFormData) => {
  const url = mode === "online" ? ONLINE_URL : OFFLINE_URL;
  let isOTPSent: boolean = false;
  let status = 400;
  let errorMessage = "";


  try {
    const response = await api.post(url, data);
    console.log(response);
    if (response.status === 200) {
      saveTokenToLocalStorage(response, data.email);
      isOTPSent = mode === "online"
      status = response.status;
     
    } else {
      errorMessage = "Unexpected response status.";
    }
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError && error.response) {
      status = error.response.status;
      errorMessage =
        error.response.data?.error ||
        error.message ||
        "An error occurred during login.";
    } else {
      errorMessage = "Network error. Please try again.";
    }
  }

  return { status, isOTPSent, errorMessage };
};
