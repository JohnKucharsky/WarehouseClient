import { DialogContent, Grid } from "@mui/material";

import { FormikProps } from "formik";
import OutlinedInputEl from "src/components/OutlinedInputEl.tsx";
import { useTranslation } from "react-i18next";
import DialogActionsEl from "src/components/DialogActionsEl.tsx";

export const SameFields = ({
  formikProps: {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
  },
  edit,
}: {
  formikProps: FormikProps<{
    city: string;
    street: string;
    house: string;
    floor: string;
    entrance: string;
    additionalInfo: string;
    submit: unknown;
  }>;
  edit?: boolean;
}) => {
  const { t } = useTranslation();

  return (
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
              touched={touched.city}
              error={errors.city}
              label={t("City")}
              name={"city"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.city}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <OutlinedInputEl
              touched={touched.street}
              error={errors.street}
              label={t("Street")}
              name={"street"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.street}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <OutlinedInputEl
              touched={touched.house}
              error={errors.house}
              label={t("House")}
              name={"house"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.house}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <OutlinedInputEl
              touched={touched.floor}
              error={errors.floor}
              label={t("Floor")}
              name={"floor"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.floor}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <OutlinedInputEl
              touched={touched.entrance}
              error={errors.entrance}
              label={t("Entrance")}
              name={"entrance"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.entrance}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <OutlinedInputEl
              touched={touched.additionalInfo}
              error={errors.additionalInfo}
              label={t("additionalInfo")}
              name={"additionalInfo"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.additionalInfo}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActionsEl
        saveIcon={edit}
        title={edit ? t("Save") : t("Create")}
        submit={errors.submit}
      />
    </form>
  );
};
