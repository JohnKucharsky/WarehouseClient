import { z } from "zod";
import { TimeStampsAndIdZod } from "../../../utils/common.ts";

const ProductZod = z
  .object({
    name: z.string(),
    serial: z.string(),
    price: z.number(),
    model: z.string().nullable(),
    picture_url: z.string(),
  })
  .merge(TimeStampsAndIdZod);

export const PaginatedProductsZod = z.object({
  data: z.array(ProductZod),
  pagination: z.object({
    total: z.number(),
    limit: z.number(),
    offset: z.number(),
  }),
});

export type Product = z.infer<typeof ProductZod>;
export type PaginatedProducts = z.infer<typeof PaginatedProductsZod>;

export interface EditProduct {
  name: string;
  serial: string;
  price: number;
  picture_url: string;
  model?: string | null;
}
