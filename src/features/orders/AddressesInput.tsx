import { Autocomplete, TextField, Tooltip } from "@mui/material";
import { FocusEventHandler, useMemo } from "react";
import { useUnit } from "effector-react";
import {
  $addresses,
  $query,
  handleChangeQueryEv,
} from "src/features/addresses/data/api.ts";
import { useTranslation } from "react-i18next";

export default function AddressesInput({
  touched,
  error,
  setFieldValue,
  handleBlur,
}: {
  touched: boolean;
  error?: string;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean,
  ) => void;
  handleBlur: FocusEventHandler;
}) {
  const [addresses, handleChangeInput, inputValue] = useUnit([
    $addresses,
    handleChangeQueryEv,
    $query,
  ]);

  const { t } = useTranslation();

  const addressesList = useMemo(
    () =>
      addresses?.data.map((item) => ({
        label: `${item.city} ${item.street} ${item.house}`,
        value: String(item.id),
      })),
    [addresses?.data],
  );

  return (
    <Tooltip title={touched && error}>
      <Autocomplete
        sx={{
          "& :hover .MuiAutocomplete-input, & .Mui-focused .MuiAutocomplete-input":
            { minWidth: "30px" },
        }}
        options={addressesList ?? []}
        fullWidth
        onBlur={handleBlur}
        onChange={(_, valueAndLabel) => {
          setFieldValue("addressId", valueAndLabel?.value ?? "");
        }}
        onInputChange={(_, value) => {
          handleChangeInput(value);
        }}
        inputValue={inputValue}
        renderOption={(props, option) => {
          return (
            <li {...props} key={`${option.label}-${option.value}`}>
              {option.label}
            </li>
          );
        }}
        filterOptions={(x) => x}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              required: false,
            }}
            required
            error={Boolean(touched && error)}
            label={t("Address")}
            fullWidth
            name={"addressId"}
          />
        )}
      />
    </Tooltip>
  );
}
