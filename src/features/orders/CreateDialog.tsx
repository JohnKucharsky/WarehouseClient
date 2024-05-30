import { Formik } from "formik";

import Title from "src/components/DialogTitleEl.tsx";
import { useTranslation } from "react-i18next";
import { AxiosErrorType, getErrorMessage } from "src/utils/axios.ts";
import { SameFields } from "src/features/addresses/SameFields.tsx";
import { useUnit } from "effector-react";
import { addAddressFx } from "src/features/addresses/data/api.ts";
import { yupSchemaAddress } from "src/features/addresses/data/service.ts";

const emptyInitialValues = {
  city: "",
  street: "",
  house: "",
  floor: "",
  entrance: "",
  additionalInfo: "",
  submit: null as unknown,
};

export default function CreateDialog({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const [createAddress] = useUnit([addAddressFx]);
  const { t } = useTranslation();

  return (
    <>
      <Title handleClose={handleClose} title={t("Create")} />
      <Formik
        initialValues={emptyInitialValues}
        validationSchema={yupSchemaAddress}
        onSubmit={async (values, { resetForm, setErrors }) => {
          try {
            await createAddress({
              city: values.city,
              street: values.street,
              house: values.house,
              floor: values.floor ? Number(values.floor) : undefined,
              entrance: values.entrance ? Number(values.entrance) : undefined,
              additional_info: values.additionalInfo
                ? values.additionalInfo
                : undefined,
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
