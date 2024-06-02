import {
  Box,
  DialogContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { FormikErrors, FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import DialogActionsEl from "src/components/DialogActionsEl.tsx";
import { Fragment } from "react";

import AddressesInput from "src/features/orders/AddressesInput.tsx";
import ProductsInput from "src/features/orders/ProductsInput.tsx";

export const SameFields = ({
  formikProps: {
    errors,
    handleBlur,
    handleSubmit,
    touched,
    values,
    setFieldValue,
  },
  edit,
}: {
  formikProps: FormikProps<{
    addressId: string;
    payment: string;
    products: { productId: string; quantity: string }[];
    submit: unknown;
  }>;
  edit?: boolean;
}) => {
  const { t } = useTranslation();

  const handleChangeQty = (value: string, productIdx: number) => {
    if (value === "Remove") {
      setFieldValue(
        "products",
        values.products.filter((_, idx) => idx !== productIdx),
      );
      return;
    }
    setFieldValue(`products.${productIdx}.quantity`, value);
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <DialogContent
        sx={{
          px: { xs: 1, md: 2 },
          py: 2,
        }}
      >
        <Grid container rowSpacing={3} columnSpacing={1.5}>
          <Grid item xs={12}>
            <AddressesInput
              setFieldValue={setFieldValue}
              touched={Boolean(touched?.addressId)}
              error={errors.addressId}
              handleBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl required fullWidth variant="outlined">
              <InputLabel>{t("Payment")}</InputLabel>
              <Select
                variant={"outlined"}
                value={values.payment}
                onChange={(e) => setFieldValue("payment", e.target.value)}
                label={t("Payment")}
              >
                {["cash", "card"].map((item) => (
                  <MenuItem key={item} value={item}>
                    {t(item)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Stack pl={2} alignItems={"center"} direction={"row"} spacing={1}>
              <Typography variant={"h6"}>{t("Products")}</Typography>
              <Tooltip title={t("addProduct")}>
                <IconButton
                  onClick={() =>
                    setFieldValue("products", [
                      ...values.products,
                      { productId: "", quantity: "1" },
                    ])
                  }
                  sx={{ height: "2rem", width: "2rem" }}
                >
                  +
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
          {values.products.map((product, index) => (
            <Fragment key={index}>
              <Grid item xs={10}>
                <ProductsInput
                  handleBlur={handleBlur}
                  touched={Boolean(touched?.products?.[index]?.productId)}
                  setFieldValue={setFieldValue}
                  name={`products.${index}.productId`}
                  error={
                    (
                      errors?.products?.[index] as FormikErrors<{
                        productId: string;
                        quantity: string;
                      }>
                    )?.productId
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <FormControl required fullWidth variant="outlined">
                  <InputLabel>{t("Quantity")}</InputLabel>
                  <Select
                    variant={"outlined"}
                    value={product.quantity}
                    onChange={(e) => handleChangeQty(e.target.value, index)}
                    label={t("Quantity")}
                  >
                    {["Remove", "1", "2", "3", "4", "5"].map((item) => {
                      if (values.products.length === 1 && item === "Remove")
                        return null;
                      return (
                        <MenuItem key={item} value={item}>
                          {t(item)}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </DialogContent>
      <DialogActionsEl
        saveIcon={edit}
        title={edit ? t("Save") : t("Create")}
        submit={errors.submit}
      />
    </Box>
  );
};
