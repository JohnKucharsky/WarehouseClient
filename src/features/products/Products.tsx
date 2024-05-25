import {
  Box,
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
import PaginationEl from "./PaginationEl.tsx";
import { $products, productStarted } from "src/features/products/data/api.ts";
import TableEmptyText from "src/components/TableEmptyText.tsx";
import TableRowEl from "src/features/products/TableRowEl.tsx";
import TableHeadEl from "src/features/products/TableHeadEl.tsx";

export default function Products() {
  const [products, pageStarted] = useUnit([$products, productStarted]);

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
          {products?.data.length === 0 ? (
            <TableEmptyText
              colSpan={8}
              title={t("couldNotFindSearchedProducts")}
            />
          ) : null}

          <TableBody>
            {products?.data.map((item) => (
              <TableRowEl key={item.id} product={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={1}>
        <PaginationEl />
      </Box>
    </>
  );
}
