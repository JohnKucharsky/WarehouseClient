import {
  createEffect,
  createEvent,
  createStore,
  merge,
  sample,
} from "effector";

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
import { debounce } from "patronum";

export const $addresses = createStore<AddressData | null>(null);

export const getAddressesFx = createEffect<{ query?: string }, AddressData>(
  async ({ query }) => {
    const res = await axiosInstance.get<AddressData>(apiRoutesEnum.address, {
      params: { query },
    });

    try {
      AddressDataZod.parse(res.data);
    } catch (e) {
      consola.error(apiRoutesEnum.address, e);
    }

    return res.data;
  },
);

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

export const $query = createStore("");
export const handleChangeQueryEv = createEvent<string>();
$query.on(handleChangeQueryEv, (_, payload) => payload);

sample({
  clock: merge([addressesStarted]),
  fn: () => ({}),
  target: getAddressesFx,
});

sample({
  clock: merge([debounce(handleChangeQueryEv, 300)]),
  source: {
    query: $query,
  },
  fn: (params) => params,
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
