import { createEffect, createEvent, createStore, sample } from "effector";

import { axiosInstance } from "src/utils/axios.ts";
import { apiRoutesEnum } from "src/utils/common.ts";
import { consola } from "consola";
import { AxiosResponse } from "axios";
import {
  EditOrder,
  OrderWithProducts,
  OrderData,
  OrderDataZod,
  OrderWithProductsZod,
} from "src/features/orders/data/types.ts";

export const $orders = createStore<OrderData | null>(null);
export const $orderWithProducts = createStore<OrderWithProducts | null>(null);

export const getOrdersFx = createEffect<unknown, OrderData>(async () => {
  const res = await axiosInstance.get<OrderData>(apiRoutesEnum.order, {});

  try {
    OrderDataZod.parse(res.data);
  } catch (e) {
    consola.error(apiRoutesEnum.order, e);
  }

  return res.data;
});

export const getOneOrderFx = createEffect<number, OrderWithProducts>(
  async (id) => {
    const res = await axiosInstance.get<OrderWithProducts>(
      apiRoutesEnum.order + "/" + id,
      {},
    );

    try {
      OrderWithProductsZod.parse(res.data);
    } catch (e) {
      consola.error(apiRoutesEnum.order, e);
    }

    return res.data;
  },
);

export const addOrderFx = createEffect<EditOrder, OrderWithProducts>(
  async (data) => {
    const res = await axiosInstance.post<
      EditOrder,
      AxiosResponse<OrderWithProducts>
    >(apiRoutesEnum.order, { ...data });

    return res.data;
  },
);

export const editOrderFx = createEffect<
  { data: EditOrder; id: number },
  OrderWithProducts
>(async (data) => {
  const res = await axiosInstance.put<
    EditOrder,
    AxiosResponse<OrderWithProducts>
  >(apiRoutesEnum.order + "/" + data.id, {
    ...data.data,
  });

  return res.data;
});

export const deleteOrderFx = createEffect<number, { data: { id: number } }>(
  async (id) => {
    const res = await axiosInstance.delete<
      unknown,
      AxiosResponse<{ data: { id: number } }>
    >(apiRoutesEnum.order + "/" + id);

    return res.data;
  },
);

export const ordersStarted = createEvent();

sample({
  clock: ordersStarted,
  target: getOrdersFx,
});

$orders
  .on(getOrdersFx.doneData, (_, payload) => payload)
  .on(addOrderFx.doneData, (state, { data }) => {
    if (!state) return null;

    return {
      data: [data, ...state.data],
    };
  })
  .on(editOrderFx.doneData, (state, { data }) => {
    if (!state) return null;

    return {
      data: state.data.map((item) => (item.id === data.id ? data : item)),
    };
  })
  .on(deleteOrderFx.doneData, (state, { data }) => {
    if (!state) return null;

    return {
      data: state.data.filter((item) => item.id !== data.id),
    };
  });

$orderWithProducts
  .on(getOneOrderFx.doneData, (_, payload) => payload)
  .on(addOrderFx.doneData, (state, payload) => {
    if (!state) return null;
    if (state.data.id === payload.data.id) {
      return payload;
    }
    return state;
  })
  .on(editOrderFx.doneData, (state, payload) => {
    if (!state) return null;
    if (state.data.id === payload.data.id) {
      return payload;
    }
    return state;
  })
  .on(deleteOrderFx.doneData, (state, { data }) => {
    if (!state) return null;

    if (state.data.id === data.id) {
      return null;
    }
  });
