import { object, ref, string } from "yup";

export const yupSchemaSignUp = object().shape({
  name: string().max(64).required(),
  lastName: string().max(64).required(),
  middleName: string().max(64),
  email: string().trim().email().max(64).required(),
  password: string().min(8).max(64).required(),
  repeatPassword: string()
    .oneOf([ref("password")])
    .required(),
});

export const yupSchemaSignIn = object().shape({
  email: string().trim().email().max(64).required(),
  password: string().min(8).max(64).required(),
});
