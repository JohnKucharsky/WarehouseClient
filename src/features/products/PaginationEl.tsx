import { TablePagination } from "@mui/material";
import { useUnit } from "effector-react";
import { $products } from "src/features/products/data/api.ts";
import { productStore } from "src/features/products/data/store.ts";

export default function AccPagination() {
  const [products, page, limit, handlePageChange, handleLimitChange] = useUnit([
    $products,
    productStore.$page,
    productStore.$limit,
    productStore.handlePageChangeEv,
    productStore.handleLimitChangeEv,
  ]);

  return (
    <TablePagination
      component="div"
      count={products?.pagination.total ?? 20}
      onPageChange={(_, newPage) => handlePageChange(newPage)}
      onRowsPerPageChange={(e) => handleLimitChange(Number(e.target.value))}
      page={page}
      rowsPerPage={limit}
      labelRowsPerPage={null}
      rowsPerPageOptions={[20, 50, 100]}
    />
  );
}
