import { createEffect, createEvent, createStore, sample } from "effector";

import { axiosInstance } from "src/utils/axios.ts";
import { apiRoutesEnum } from "src/utils/common.ts";
import { consola } from "consola";
import { AxiosResponse } from "axios";
import {
  Address,
  AddressData,
  AddressDataZod,
  EditAddress,
} from "src/features/addresses/data/types.ts";

export const $addresses = createStore<AddressData | null>(null);

export const getAddressesFx = createEffect<unknown, AddressData>(async () => {
  const res = await axiosInstance.get<AddressData>(apiRoutesEnum.address, {});

  try {
    AddressDataZod.parse(res.data);
  } catch (e) {
    consola.error(apiRoutesEnum.address, e);
  }

  return res.data;
});

export const addAddressFx = createEffect<EditAddress, { data: Address }>(
  async (data) => {
    const res = await axiosInstance.post<
      EditAddress,
      AxiosResponse<{ data: Address }>
    >(apiRoutesEnum.address, { ...data });

    return res.data;
  },
);

export const editAddressFx = createEffect<
  { data: EditAddress; id: number },
  { data: Address }
>(async (data) => {
  const res = await axiosInstance.put<
    EditAddress,
    AxiosResponse<{ data: Address }>
  >(apiRoutesEnum.address + "/" + data.id, {
    ...data.data,
  });

  return res.data;
});

export const deleteAddressFx = createEffect<number, { data: Address }>(
  async (id) => {
    const res = await axiosInstance.delete<
      unknown,
      AxiosResponse<{ data: Address }>
    >(apiRoutesEnum.address + "/" + id);

    return res.data;
  },
);

export const addressesStarted = createEvent();

sample({
  clock: addressesStarted,
  target: getAddressesFx,
});

$addresses
  .on(getAddressesFx.doneData, (_, payload) => payload)
  .on(addAddressFx.doneData, (state, { data }) => {
    if (!state) return null;

    return {
      data: [data, ...state.data],
    };
  })
  .on(editAddressFx.doneData, (state, { data }) => {
    if (!state) return null;
    return {
      data: state.data.map((item) => (item.id === data.id ? data : item)),
    };
  })
  .on(deleteAddressFx.doneData, (state, { data }) => {
    if (!state) return null;
    return {
      data: state.data.filter((item) => item.id !== data.id),
    };
  });
