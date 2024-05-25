import { object, string } from "yup";
import { POSITIVE_NUMBER_REGEX } from "src/utils/common.ts";

export const yupSchemaProduct = object().shape({
  name: string().max(64).required(),
  serial: string().max(64).required(),
  price: string()
    .matches(POSITIVE_NUMBER_REGEX, "Only positive numbers")
    .max(64)
    .required(),
  picture_url: string().max(64).required(),
  model: string().max(64),
});
