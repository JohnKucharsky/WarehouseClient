import { Box, TableCell, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useUnit } from "effector-react";
import { productStore } from "./data/store.ts";

export default function TableHead({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const [handleRequestSort, sortOrder, orderBy] = useUnit([
    productStore.handleSortEv,
    productStore.$sortOrder,
    productStore.$orderBy,
  ]);

  return (
    <TableCell>
      <TableSortLabel
        active={orderBy === value}
        direction={orderBy === value ? sortOrder : "asc"}
        onClick={() => handleRequestSort(value)}
      >
        {label}
        {orderBy === value ? (
          <Box component="span" sx={visuallyHidden}>
            {sortOrder === "desc" ? "sorted descending" : "sorted ascending"}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
}
