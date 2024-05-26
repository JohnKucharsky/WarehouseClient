import { createEffect, createEvent, createStore, sample } from "effector";
import { axiosInstance } from "src/utils/axios.ts";
import { apiRoutesEnum } from "src/utils/common.ts";
import { consola } from "consola";
import {
  SignInInput,
  SignUpInput,
  User,
  UserZod,
} from "src/features/auth/data/types.ts";
import { z } from "zod";
import { AxiosResponse } from "axios";

export const $user = createStore<User | null>(null);
export const setUserEv = createEvent<User | null>();

export const signUpFx = createEffect<SignUpInput, User>(async (data) => {
  const res = await axiosInstance.post<
    SignUpInput,
    AxiosResponse<{ data: User }>
  >(apiRoutesEnum.signUp, { ...data });

  try {
    z.object({ data: UserZod }).parse(res.data);
  } catch (e) {
    consola.error(apiRoutesEnum.signUp, e);
  }

  return res.data.data;
});

export const signInFx = createEffect<SignInInput, User>(async (data) => {
  const res = await axiosInstance.post<
    SignInInput,
    AxiosResponse<{ data: User; access_token: string }>
  >(apiRoutesEnum.login, {
    ...data,
  });

  try {
    z.object({ access_token: z.string(), data: UserZod }).parse(res.data);
  } catch (e) {
    consola.error(apiRoutesEnum.login, e);
  }

  window.localStorage.setItem("refresh_time", String(new Date().getTime()));

  return res.data.data;
});

export const logoutFx = createEffect<unknown, string>(async () => {
  const res = await axiosInstance.get<string>(apiRoutesEnum.logout);

  try {
    z.string().parse(res.data);
  } catch (e) {
    consola.error(apiRoutesEnum.logout, e);
  }

  window.localStorage.removeItem("refresh_time");
  return res.data;
});

export const getMeFx = createEffect<unknown, User>(async () => {
  const res = await axiosInstance.get<{ data: User }>(apiRoutesEnum.me);

  if (res.status !== 401) {
    try {
      z.object({ data: UserZod }).parse(res.data);
    } catch (e) {
      consola.error(apiRoutesEnum.me, e);
    }
  }

  return res.data.data;
});

export const getMeEv = createEvent();
sample({
  clock: getMeEv,
  target: getMeFx,
});

$user
  .on(setUserEv, (_, payload) => payload)
  .on(signUpFx.doneData, (_, payload) => payload)
  .on(signInFx.doneData, (_, payload) => payload)
  .on(logoutFx.doneData, () => null)
  .on(getMeFx.doneData, (_, payload) => payload);
