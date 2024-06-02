import { Formik } from "formik";

import Title from "src/components/DialogTitleEl.tsx";
import { useTranslation } from "react-i18next";
import { AxiosErrorType, getErrorMessage } from "src/utils/axios.ts";
import { SameFields } from "src/features/orders/SameFields.tsx";
import { useUnit } from "effector-react";
import { yupSchemaOrders } from "src/features/orders/data/service.ts";
import { addOrderFx } from "src/features/orders/data/api.ts";
import { useEffect } from "react";
import { addressesStarted } from "src/features/addresses/data/api.ts";

const emptyInitialValues = {
  addressId: "",
  payment: "card",
  products: [{ productId: "", quantity: "1" }] as {
    productId: string;
    quantity: string;
  }[],
  submit: null as unknown,
};

export default function CreateDialog({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const [createOrder] = useUnit([addOrderFx]);
  const [getAddresses] = useUnit([addressesStarted]);
  const { t } = useTranslation();

  useEffect(() => {
    getAddresses();
  }, [getAddresses]);

  return (
    <>
      <Title handleClose={handleClose} title={t("Create")} />
      <Formik
        initialValues={emptyInitialValues}
        validationSchema={yupSchemaOrders}
        onSubmit={async (values, { resetForm, setErrors }) => {
          try {
            await createOrder({
              address_id: Number(values.addressId),
              payment: values.payment,
              products: values.products.map((v) => ({
                product_id: Number(v.productId),
                quantity: Number(v.quantity),
              })),
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
