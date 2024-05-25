import { z } from "zod";

export enum apiRoutesEnum {
  signUp = "/api/auth/sign-up",
  login = "/api/auth/login",
  logout = "/api/auth/logout",
  refresh = "/api/auth/refresh",
  me = "/api/auth/me",
  address = "/api/address",
  shelf = "/api/shelf",
  product = "/api/product",
  order = "/api/order",
  assemblyInfo = "/api/operations/assembly_info",
  placeProducts = "/api/operations/place_products",
  removeProducts = "/api/operations/remove_products",
}

export enum paths {
  products = "products",
  addresses = "addresses",
  shelves = "shelves",
  shelf = "shelf",
  orders = "orders",
  order = "order",
  assembly_info = "assembly_info",
}

export const TimeStampsAndIdZod = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const POSITIVE_NUMBER_REGEX =
  /^(?!^[-+]?[0.]+(?:[Ee]|$))(?!^-)[+-]?(?=[0123456789.])(?:[0123456789]+(?:[.][0123456789]*)?|[.][0123456789]+)(?:[Ee][+-]?[0123456789]+|)$/;
