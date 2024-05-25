import { Formik } from "formik";

import { yupSchemaProduct } from "src/features/products/data/service.ts";
import Title from "src/components/DialogTitleEl.tsx";
import { useTranslation } from "react-i18next";
import { AxiosErrorType, getErrorMessage } from "src/utils/axios.ts";
import { SameFields } from "src/features/products/SameFields.tsx";
import { useUnit } from "effector-react";
import { addProductFx } from "src/features/products/data/api.ts";

const emptyInitialValues = {
  name: "",
  serial: "",
  price: "",
  model: "",
  picture_url: "",
  submit: null as unknown,
};

export default function CreateDialog({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const [createProduct] = useUnit([addProductFx]);
  const { t } = useTranslation();

  return (
    <>
      <Title handleClose={handleClose} title={t("createProduct")} />
      <Formik
        initialValues={emptyInitialValues}
        validationSchema={yupSchemaProduct}
        onSubmit={async (values, { resetForm, setErrors }) => {
          try {
            await createProduct({
              name: values.name,
              serial: values.serial,
              price: Number(values.price),
              picture_url: values.picture_url,
              model: values.model ? values.model : undefined,
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
        {(formikProps) => <SameFields formikProps={formikProps} />}
      </Formik>
    </>
  );
}
