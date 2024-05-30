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

import TableEmptyText from "src/components/TableEmptyText.tsx";
import TableRowEl from "src/features/orders/TableRowEl.tsx";
import TableHeadEl from "src/features/orders/TableHeadEl.tsx";
import { $orders, ordersStarted } from "src/features/orders/data/api.ts";

export default function Orders() {
  const [orders, pageStarted] = useUnit([$orders, ordersStarted]);

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
          {orders?.data.length === 0 ? (
            <TableEmptyText
              colSpan={8}
              title={t("couldNotFindSearchedItems")}
            />
          ) : null}

          <TableBody>
            {orders?.data.map((item) => (
              <TableRowEl key={item.id} order={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
