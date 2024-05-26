import axios, { AxiosError } from "axios";
import { consola } from "consola";
import { refreshToken } from "src/features/auth/data/service.ts";

export type AxiosErrorType = AxiosError<{
  message: string;
}>;

export const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    refreshToken();
    return response;
  },
  async (error) => {
    refreshToken();

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

// axiosInstance.interceptors.response.use(
//     (response) => {
//       return response
//     },
//     async (error) => {
//       const originalRequest = error.config;
//
//       // If the error is a 401 and we have a refresh token, refresh the JWT token
//       if (error.response.status === 401 && sessionStorage.getItem("refresh_token")) {
//         const refreshToken = JSON.parse(sessionStorage.getItem("refresh_token"));
//
//         let data = JSON.stringify({
//           refresh_token: refreshToken,
//         });
//
//         const access_token = await refreshTheToken(data)
//         // Re-run the original request that was intercepted
//         originalRequest.headers.Authorization = `Bearer ${access_token}`;
//         return axiosInstance(originalRequest);
//       }
//
//       // Return the original error if we can't handle it
//       return Promise.reject(error);
//     }
// );
