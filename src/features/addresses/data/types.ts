import { z } from "zod";
import { TimeStampsAndIdZod } from "src/utils/common.ts";

const AddressZod = z
  .object({
    city: z.string(),
    street: z.string(),
    house: z.string(),
    floor: z.number().nullable(),
    entrance: z.number().nullable(),
    additional_info: z.string().nullable(),
  })
  .merge(TimeStampsAndIdZod);

export const AddressDataZod = z.object({ data: z.array(AddressZod) });

export type Address = z.infer<typeof AddressZod>;
export type AddressData = z.infer<typeof AddressDataZod>;

export interface EditAddress {
  city: string;
  street: string;
  house: string;
  floor?: number | null;
  entrance?: number | null;
  additional_info?: string | null;
}
