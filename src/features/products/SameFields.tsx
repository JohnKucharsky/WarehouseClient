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
    name: string;
    serial: string;
    price: string;
    model: string;
    picture_url: string;
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
              touched={touched.name}
              error={errors.name}
              label={t("Name")}
              name={"name"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.name}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <OutlinedInputEl
              touched={touched.serial}
              error={errors.serial}
              label={t("Serial")}
              name={"serial"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.serial}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <OutlinedInputEl
              touched={touched.price}
              error={errors.price}
              label={t("Price")}
              name={"price"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.price}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <OutlinedInputEl
              touched={touched.picture_url}
              error={errors.picture_url}
              label={t("Picture")}
              name={"picture_url"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.picture_url}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <OutlinedInputEl
              touched={touched.model}
              error={errors.model}
              label={t("Model")}
              name={"model"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.model}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActionsEl edit={edit} submit={errors.submit} />
    </form>
  );
};
