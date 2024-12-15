import { AxiosError } from "axios";

export interface ApiResponse<T>{
  status: 'success' | 'error';
  data?: T;
  error?: AxiosError;
  statusCode?: number;
}

export const handleSucess = <T>(response: { data: T }): ApiResponse<T> => {
  return {
    status: "success",
    data: response.data,
  };
};

export const handleError = (error: unknown): ApiResponse<never> => {
  return {
    status: 'error',
    error: error as AxiosError,
    statusCode: (error as AxiosError).response?.status,
  }
};
