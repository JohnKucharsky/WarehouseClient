import axios, { AxiosError } from "axios";
import { consola } from "consola";
import { getCookieValue } from "src/utils/getCookie.ts";
import { apiRoutesEnum, MINUTE } from "src/utils/common.ts";
import { getMeFx } from "src/features/auth/data/api.ts";

export type AxiosErrorType = AxiosError<{
  message: string;
}>;

export const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (!getCookieValue("logged_in")) {
      const localStorageRefreshTime =
        window.localStorage.getItem("refresh_time");
      if (localStorageRefreshTime !== null) {
        const now = new Date().getTime();
        const refresh_time = Number(localStorageRefreshTime);

        if (refresh_time + MINUTE < now) {
          axiosInstance
            .get(apiRoutesEnum.refresh)
            .then(() => {
              window.localStorage.setItem(
                "refresh_time",
                String(new Date().getTime()),
              );
              getMeFx({});
            })
            .catch((err) => {
              window.localStorage.removeItem("refresh_time");
              consola.error(getErrorMessage(err as AxiosErrorType));
            });
        }
      }
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (!getCookieValue("logged_in")) {
      const localStorageRefreshTime =
        window.localStorage.getItem("refresh_time");
      if (localStorageRefreshTime !== null) {
        const now = new Date().getTime();
        const refresh_time = Number(localStorageRefreshTime);

        if (refresh_time + MINUTE < now) {
          axiosInstance
            .get(apiRoutesEnum.refresh)
            .then(() => {
              window.localStorage.setItem(
                "refresh_time",
                String(new Date().getTime()),
              );
              getMeFx({});
              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              window.localStorage.removeItem("refresh_time");
              consola.error(getErrorMessage(err as AxiosErrorType));
            });
        }
      }
    }

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
