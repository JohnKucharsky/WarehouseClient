import { object, string } from "yup";
import { POSITIVE_NUMBER_REGEX } from "src/utils/common.ts";

export const yupSchemaAddress = object().shape({
  city: string().max(64).required(),
  street: string().max(64).required(),
  house: string().max(64).required(),
  floor: string()
    .matches(POSITIVE_NUMBER_REGEX, "Only positive numbers")
    .max(64),
  entrance: string().max(64),
  additional_info: string().max(64),
});
