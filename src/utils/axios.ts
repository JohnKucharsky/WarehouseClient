import axios, { AxiosError } from "axios";
import { consola } from "consola";

export type AxiosErrorType = AxiosError<{
  message: string;
}>;

export const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    consola.error({
      url: error?.response?.config?.url,
      message:
        (error as AxiosErrorType)?.response?.data?.message ??
        (error as AxiosErrorType)?.message,
      params: error?.config?.response?.config?.params,
    });

    return Promise.reject(error);
  },
);

export const getErrorMessage = (err: AxiosErrorType) => {
  return (
    ((err as AxiosErrorType)?.response?.data?.message ??
      (err as AxiosErrorType)?.message) ||
    ""
  );
};
