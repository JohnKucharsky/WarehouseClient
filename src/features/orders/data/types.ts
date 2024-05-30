import { z } from "zod";
import { TimeStampsAndIdZod } from "src/utils/common.ts";

const OrderShortZod = z
  .object({
    address_id: z.number(),
    payment: z.string(),
  })
  .merge(TimeStampsAndIdZod);

const ProductIdQtyZod = z.object({
  product_id: z.number(),
  quantity: z.number(),
});

export const OrderZod = z
  .object({
    address_id: z.number(),
    payment: z.string(),
    products: z.array(ProductIdQtyZod),
  })
  .merge(TimeStampsAndIdZod);

export const OrderDataZod = z.object({ data: z.array(OrderShortZod) });
export const OrderWithProductsZod = z.object({ data: OrderZod });

export type Order = z.infer<typeof OrderShortZod>;
export type OrderData = z.infer<typeof OrderDataZod>;
export type OrderWithProducts = z.infer<typeof OrderWithProductsZod>;
export type ProductIdQty = z.infer<typeof ProductIdQtyZod>;

export interface EditOrder {
  address_id: number;
  payment: string;
  products: ProductIdQty[];
}
