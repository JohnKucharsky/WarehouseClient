import { array, object, string } from "yup";
import { POSITIVE_NUMBER_REGEX } from "src/utils/common.ts";

export const yupSchemaOrders = object().shape({
  addressId: string()
    .matches(POSITIVE_NUMBER_REGEX, "Positive number")
    .required("Required"),
  payment: string().oneOf(["cash", "card"]).required(),
  products: array()
    .of(
      object().shape({
        productId: string()
          .matches(POSITIVE_NUMBER_REGEX, "Positive number")
          .required(),
        quantity: string()
          .matches(POSITIVE_NUMBER_REGEX, "Positive number")
          .required(),
      }),
    )
    .required(),
});
