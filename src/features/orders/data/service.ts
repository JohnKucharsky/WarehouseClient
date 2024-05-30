import { array, number, object, string } from "yup";

export const yupSchemaOrders = object().shape({
  address_id: number().required(),
  street: string().max(64).required(),
  products: array()
    .of(
      object().shape({
        product_id: number().required(),
        quantity: number().required(),
      }),
    )
    .required(),
});
