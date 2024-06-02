import { Formik } from "formik";

import { SameFields } from "./SameFields.tsx";
import { AxiosErrorType, getErrorMessage } from "src/utils/axios.ts";
import DialogTitleEl from "src/components/DialogTitleEl.tsx";
import { useTranslation } from "react-i18next";
import { useUnit } from "effector-react";
import { OrderWithProducts } from "src/features/orders/data/types.ts";
import { editOrderFx } from "src/features/orders/data/api.ts";
import { yupSchemaOrders } from "src/features/orders/data/service.ts";

export default function EditDialog({
  handleClose,
  initialValues,
}: {
  handleClose: () => void;
  initialValues: OrderWithProducts;
}) {
  const [editOrder] = useUnit([editOrderFx]);
  const { t } = useTranslation();

  return (
    <>
      <DialogTitleEl handleClose={handleClose} title={t("Edit")} />
      <Formik
        initialValues={{
          addressId: String(initialValues.data.address_id),
          payment: initialValues.data.payment,
          products: initialValues.data.products.map((p) => ({
            productId: String(p.product_id),
            quantity: String(p.quantity),
          })),
          submit: null as unknown,
        }}
        validationSchema={yupSchemaOrders}
        onSubmit={async (values, { resetForm, setErrors }) => {
          try {
            await editOrder({
              data: {
                address_id: Number(values.addressId),
                payment: values.payment,
                products: values.products.map((p) => ({
                  product_id: Number(p.productId),
                  quantity: Number(p.quantity),
                })),
              },
              id: initialValues.data.id,
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
