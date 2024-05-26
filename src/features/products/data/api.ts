import { createEffect, createEvent, createStore } from "effector";
import {
  EditProduct,
  PaginatedProducts,
  PaginatedProductsZod,
  Product,
} from "./types.ts";
import { axiosInstance } from "src/utils/axios.ts";
import { apiRoutesEnum } from "src/utils/common.ts";
import { consola } from "consola";
import { AxiosResponse } from "axios";

export const $products = createStore<PaginatedProducts | null>(null);

export const getProductsFx = createEffect<
  {
    page?: number;
    limit?: number;
    order_by?: string;
    sort_order?: string;
  },
  PaginatedProducts
>(async ({ page, limit = 20, order_by, sort_order }) => {
  const res = await axiosInstance.get<PaginatedProducts>(
    apiRoutesEnum.product,
    {
      params: {
        offset: page ? Number(page) * Number(limit) : undefined,
        limit: limit ?? undefined,
        order_by: order_by ?? undefined,
        sort_order: sort_order ?? undefined,
      },
    },
  );

  try {
    PaginatedProductsZod.parse(res.data);
  } catch (e) {
    consola.error(apiRoutesEnum.product, e);
  }

  return res.data;
});

export const productStarted = createEvent();

export const addProductFx = createEffect<EditProduct, Product>(async (data) => {
  const res = await axiosInstance.post<
    EditProduct,
    AxiosResponse<{ data: Product }>
  >(apiRoutesEnum.product, { ...data });

  return res.data.data;
});

export const editProductFx = createEffect<
  { data: EditProduct; id: number },
  Product
>(async (data) => {
  const res = await axiosInstance.put<
    EditProduct,
    AxiosResponse<{ data: Product }>
  >(apiRoutesEnum.product + "/" + data.id, {
    ...data.data,
  });

  return res.data.data;
});

export const deleteProductFx = createEffect<number, Product>(async (id) => {
  const res = await axiosInstance.delete<
    unknown,
    AxiosResponse<{ data: Product }>
  >(apiRoutesEnum.product + "/" + id);

  return res.data.data;
});

$products
  .on(getProductsFx.doneData, (_, payload) => payload)
  .on(addProductFx.doneData, (state, payload) => {
    if (!state) return null;
    console.log(state, payload);
    return {
      data: [payload, ...state.data],
      pagination: {
        ...state.pagination,
        total: state.pagination.total + 1,
      },
    };
  })
  .on(editProductFx.doneData, (state, payload) => {
    if (!state) return null;
    return {
      data: state.data.map((product) =>
        product.id === payload.id ? payload : product,
      ),
      pagination: state.pagination,
    };
  })
  .on(deleteProductFx.doneData, (state, payload) => {
    if (!state) return null;
    return {
      data: state.data.filter((product) => product.id !== payload.id),
      pagination: {
        ...state.pagination,
        total: state.pagination.total - 1,
      },
    };
  });
