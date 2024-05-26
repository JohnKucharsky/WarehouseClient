import Title from "src/components/DialogTitleEl.tsx";
import { Formik } from "formik";
import { AxiosErrorType, getErrorMessage } from "src/utils/axios.ts";
import { useUnit } from "effector-react";
import { signUpFx } from "src/features/auth/data/api.ts";
import { useTranslation } from "react-i18next";
import { DialogContent, Grid } from "@mui/material";
import OutlinedInputEl from "src/components/OutlinedInputEl.tsx";
import DialogActionsEl from "src/components/DialogActionsEl.tsx";
import PasswordInputEl from "src/components/PasswordInputEl.tsx";
import { yupSchemaSignUp } from "src/features/auth/data/service.ts";

const emptyInitialValues = {
  name: "",
  lastName: "",
  middleName: "",
  email: "",
  password: "",
  repeatPassword: "",
  submit: null as unknown,
};

export default function Register({ handleClose }: { handleClose: () => void }) {
  const [signUp] = useUnit([signUpFx]);

  const { t } = useTranslation();

  return (
    <>
      <Title handleClose={handleClose} title={t("Register")} />
      <Formik
        initialValues={emptyInitialValues}
        validationSchema={yupSchemaSignUp}
        onSubmit={async (values, { resetForm, setErrors }) => {
          try {
            await signUp({
              name: values.name,
              last_name: values.lastName,
              middle_name: values.middleName ? values.middleName : undefined,
              email: values.email,
              password: values.password,
            });
            handleClose();

            resetForm();
          } catch (err) {
            setErrors({
              submit: getErrorMessage(err as AxiosErrorType),
            });
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent
              sx={{
                px: { xs: 1, md: 2 },
                py: 2,
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <OutlinedInputEl
                    touched={touched.name}
                    error={errors.name}
                    label={t("personName")}
                    name={"name"}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.name}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <OutlinedInputEl
                    touched={touched.lastName}
                    error={errors.lastName}
                    label={t("lastName")}
                    name={"lastName"}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.lastName}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <OutlinedInputEl
                    touched={touched.middleName}
                    error={errors.middleName}
                    label={t("middleName")}
                    name={"middleName"}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.middleName}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <OutlinedInputEl
                    touched={touched.email}
                    error={errors.email}
                    label={t("Email")}
                    name={"email"}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.email}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PasswordInputEl
                    touched={touched.password}
                    error={errors.password}
                    label={t("Password")}
                    name={"password"}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.password}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PasswordInputEl
                    touched={touched.repeatPassword}
                    error={errors.repeatPassword}
                    label={t("repeatPassword")}
                    name={"repeatPassword"}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.repeatPassword}
                    required
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActionsEl
              title={t("registerButton")}
              submit={errors.submit}
            />
          </form>
        )}
      </Formik>
    </>
  );
}
