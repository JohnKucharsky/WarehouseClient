import Title from "src/components/DialogTitleEl.tsx";
import { Formik } from "formik";
import { AxiosErrorType, getErrorMessage } from "src/utils/axios.ts";
import { useUnit } from "effector-react";
import { signInFx } from "src/features/auth/data/api.ts";
import { useTranslation } from "react-i18next";
import { DialogContent, Grid } from "@mui/material";
import OutlinedInputEl from "src/components/OutlinedInputEl.tsx";
import DialogActionsEl from "src/components/DialogActionsEl.tsx";
import PasswordInputEl from "src/components/PasswordInputEl.tsx";
import { yupSchemaSignIn } from "src/features/auth/data/service.ts";
import { ordersStarted } from "src/features/orders/data/api.ts";

const emptyInitialValues = {
  email: "",
  password: "",
  submit: null as unknown,
};

export default function Login({
  handleClose,
  callFromOrders,
}: {
  handleClose?: () => void;
  callFromOrders?: boolean;
}) {
  const [signIn] = useUnit([signInFx]);
  const [fetchOrders] = useUnit([ordersStarted]);

  const { t } = useTranslation();

  return (
    <>
      <Title handleClose={handleClose} title={t("Login")} />
      <Formik
        initialValues={emptyInitialValues}
        validationSchema={yupSchemaSignIn}
        onSubmit={async (values, { resetForm, setErrors }) => {
          try {
            await signIn({
              email: values.email,
              password: values.password,
            });
            handleClose?.();
            if (callFromOrders) {
              fetchOrders();
            }

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
              </Grid>
            </DialogContent>
            <DialogActionsEl title={t("Enter")} submit={errors.submit} />
          </form>
        )}
      </Formik>
    </>
  );
}
