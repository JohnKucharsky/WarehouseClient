import { object, ref, string } from "yup";
import { getCookieValue } from "src/utils/getCookie.ts";
import { apiRoutesEnum, MINUTE } from "src/utils/common.ts";
import { consola } from "consola";
import {
  AxiosErrorType,
  axiosInstance,
  getErrorMessage,
} from "src/utils/axios.ts";

export const yupSchemaSignUp = object().shape({
  name: string().max(64).required(),
  lastName: string().max(64).required(),
  middleName: string().max(64),
  email: string().trim().email().max(64).required(),
  password: string().min(8).max(64).required(),
  repeatPassword: string()
    .oneOf([ref("password")])
    .required(),
});

export const yupSchemaSignIn = object().shape({
  email: string().trim().email().max(64).required(),
  password: string().min(8).max(64).required(),
});

export const refreshToken = () => {
  if (!getCookieValue("logged_in")) {
    const localStorageRefreshTime = window.localStorage.getItem("refresh_time");
    if (localStorageRefreshTime !== null) {
      const now = new Date().getTime();
      const refresh_time = Number(localStorageRefreshTime);

      if (refresh_time + 10 * MINUTE < now) {
        axiosInstance
          .get(apiRoutesEnum.refresh)
          .then(() =>
            window.localStorage.setItem(
              "refresh_time",
              String(new Date().getTime()),
            ),
          )
          .catch((err) => {
            window.localStorage.removeItem("refresh_time");
            consola.error(getErrorMessage(err as AxiosErrorType));
          });
      }
    }
  }
};
