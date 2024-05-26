import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useUnit } from "effector-react/compat";

import { useTranslation } from "react-i18next";
import {
  $addresses,
  addressesStarted,
} from "src/features/addresses/data/api.ts";
import TableEmptyText from "src/components/TableEmptyText.tsx";
import TableRowEl from "src/features/addresses/TableRowEl.tsx";
import TableHeadEl from "src/features/addresses/TableHeadEl.tsx";

export default function Addresses() {
  const [addresses, pageStarted] = useUnit([$addresses, addressesStarted]);

  const { t } = useTranslation();

  useEffect(() => {
    pageStarted();
  }, [pageStarted]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadEl />
            </TableRow>
          </TableHead>
          {addresses?.data.length === 0 ? (
            <TableEmptyText
              colSpan={8}
              title={t("couldNotFindSearchedItems")}
            />
          ) : null}

          <TableBody>
            {addresses?.data.map((item) => (
              <TableRowEl key={item.id} address={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
