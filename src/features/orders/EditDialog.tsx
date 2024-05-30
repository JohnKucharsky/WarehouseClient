import { Formik } from "formik";

import { SameFields } from "./SameFields.tsx";
import { yupSchemaAddress } from "src/features/addresses/data/service.ts";
import { AxiosErrorType, getErrorMessage } from "src/utils/axios.ts";
import DialogTitleEl from "src/components/DialogTitleEl.tsx";
import { useTranslation } from "react-i18next";
import { useUnit } from "effector-react";
import { Order } from "src/features/orders/data/types.ts";
import { editOrderFx } from "src/features/orders/data/api.ts";

export default function EditDialog({
  handleClose,
  initialValues,
}: {
  handleClose: () => void;
  initialValues: Order;
}) {
  const [editOrder] = useUnit([editOrderFx]);
  const { t } = useTranslation();

  return (
    <>
      <DialogTitleEl handleClose={handleClose} title={t("Edit")} />
      <Formik
        initialValues={{
          city: initialValues.city,
          street: initialValues.street,
          house: initialValues.house,
          floor: initialValues.floor ? String(initialValues.floor) : "",
          entrance: initialValues.entrance ? String(initialValues.floor) : "",
          additionalInfo: initialValues.additional_info ?? "",
          submit: null as unknown,
        }}
        validationSchema={yupSchemaAddress}
        onSubmit={async (values, { resetForm, setErrors }) => {
          try {
            await editOrder({
              data: {
                city: values.city,
                street: values.street,
                house: values.house,
                floor: values.floor ? Number(values.floor) : undefined,
                entrance: values.entrance ? Number(values.entrance) : undefined,
                additional_info: values.additionalInfo
                  ? values.additionalInfo
                  : undefined,
              },
              id: initialValues.id,
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
        {(formikProps) => <SameFields formikProps={formikProps} edit />}
      </Formik>
    </>
  );
}
