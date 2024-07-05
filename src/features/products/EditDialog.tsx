import { Formik } from "formik";

import { SameFields } from "./SameFields.tsx";
import { yupSchemaProduct } from "src/features/products/data/service.ts";
import { Product } from "src/features/products/data/types.ts";
import { AxiosErrorType, getErrorMessage } from "src/utils/axios.ts";
import DialogTitleEl from "src/components/DialogTitleEl.tsx";
import { useTranslation } from "react-i18next";

export default function EditDialog({
  handleClose,
  initialValues,
}: {
  handleClose: () => void;
  initialValues: Product;
}) {
  const { t } = useTranslation();

  return (
    <>
      <DialogTitleEl handleClose={handleClose} title={t("Edit")} />
      <Formik
        initialValues={{
          name: initialValues.name,
          serial: initialValues.serial,
          price: String(initialValues.price),
          picture_url: String(initialValues.picture_url),
          model: initialValues.model ? String(initialValues.model) : "",
          submit: null as unknown,
        }}
        validationSchema={yupSchemaProduct}
        onSubmit={async (_values, { resetForm, setErrors }) => {
          try {
            // request here
            handleClose();

            resetForm();
          } catch (err) {
            setErrors({
              submit: getErrorMessage(err as AxiosErrorType),
            });
          }
        }}
      >
        {(formikProps) => <SameFields formikProps={formikProps} edit />}
      </Formik>
    </>
  );
}
