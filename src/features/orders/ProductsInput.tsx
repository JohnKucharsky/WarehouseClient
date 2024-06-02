import { Autocomplete, TextField, Tooltip } from "@mui/material";
import { FocusEventHandler, memo, useEffect, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import { PaginatedProducts } from "src/features/products/data/types.ts";
import { axiosInstance } from "src/utils/axios.ts";
import { apiRoutesEnum } from "src/utils/common.ts";

const ProductsInput = memo(function ProductsInput({
  touched,
  error,
  setFieldValue,
  handleBlur,
  name,
}: {
  touched: boolean;
  error?: string;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean,
  ) => void;
  handleBlur: FocusEventHandler;
  name: string;
}) {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<PaginatedProducts | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { t } = useTranslation();

  const toLoad = open && !products?.data.length;

  useEffect(() => {
    let active = true;

    if (!toLoad || query) {
      return;
    }

    (async () => {
      const res = await axiosInstance.get<PaginatedProducts>(
        apiRoutesEnum.product,
        {
          params: {
            offset: 0,
            limit: 20,
          },
        },
      );

      if (active) {
        setProducts(res.data);
      }
    })();

    return () => {
      active = false;
    };
  }, [query, toLoad]);

  useEffect(() => {
    let active = true;

    if (page != 1) {
      (async () => {
        const res = await axiosInstance.get<PaginatedProducts>(
          apiRoutesEnum.product,
          {
            params: {
              offset: (page - 1) * 20,
              limit: 20,
            },
          },
        );

        if (active) {
          setProducts((p) => {
            if (!p) return null;
            return {
              data: [...p.data, ...res.data.data],
              pagination: res.data.pagination,
            };
          });
        }
      })();
    }

    return () => {
      active = false;
    };
  }, [page]);

  useEffect(() => {
    if (products) {
      if (products.data.length < 20) {
        setPage(1);
      }
    }
  }, [products, products?.data.length]);

  useEffect(() => {
    let active = true;

    if (query && query !== "loadMore") {
      (async () => {
        const res = await axiosInstance.get<PaginatedProducts>(
          apiRoutesEnum.product,
          {
            params: {
              offset: 0,
              limit: 20,
              query,
            },
          },
        );

        if (active) {
          setProducts(res.data);
        }
      })();
    }

    return () => {
      active = false;
    };
  }, [query]);

  const options = useMemo(() => {
    const productsList = products?.data.map((item) => ({
      label: `${item.name} ${item.model ?? ""}`,
      value: String(item.id),
    }));

    if (productsList) {
      if (
        productsList.length > 19 &&
        (page - 1) * 20 < (products?.pagination.total ?? 0)
      ) {
        return [
          ...productsList,
          { label: "loadMore", value: "i7cqyw387ywqbv876t" },
        ];
      }
      return productsList;
    }
    return [];
  }, [page, products?.data, products?.pagination.total]);

  return (
    <Tooltip title={touched && error}>
      <Autocomplete
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        sx={{
          "& :hover .MuiAutocomplete-input, & .Mui-focused .MuiAutocomplete-input":
            { minWidth: "30px" },
        }}
        options={options}
        fullWidth
        onBlur={handleBlur}
        onChange={(_, valueAndLabel) => {
          if (valueAndLabel?.value === "i7cqyw387ywqbv876t") {
            setPage((p) => p + 1);
            return;
          }

          setFieldValue(name, valueAndLabel?.value ?? "");
        }}
        onInputChange={(_, value) => {
          setQuery(value);
        }}
        inputValue={t(query)}
        renderOption={(props, option) => {
          return (
            <li {...props} key={`${option.label}-${option.value}`}>
              {option.label === "loadMore" ? t("loadMore") : option.label}
            </li>
          );
        }}
        disableCloseOnSelect
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
            label={t("Product")}
            fullWidth
            name={name}
          />
        )}
      />
    </Tooltip>
  );
});

export default ProductsInput;
