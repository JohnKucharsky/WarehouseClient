import {
  Box,
  Dialog,
  IconButton,
  Stack,
  TableCell,
  TableRow,
} from "@mui/material";
import { Product } from "src/features/products/data/types.ts";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import ConfirmDelete from "src/components/ConfirmDelete.tsx";
import EditDialog from "src/features/products/EditDialog.tsx";
import { useUnit } from "effector-react";
import { deleteProductFx } from "src/features/products/data/api.ts";
import { consola } from "consola";
import { AxiosErrorType, getErrorMessage } from "src/utils/axios.ts";
import { NumericFormat } from "react-number-format";

export default function TableRowEl({ product }: { product: Product }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [deleteProduct] = useUnit([deleteProductFx]);

  const handleDelete = () => {
    deleteProduct(product.id)
      .catch((err) => consola.error(getErrorMessage(err as AxiosErrorType)))
      .finally(() => setOpenDelete(false));
  };

  return (
    <>
      <Dialog onClose={() => setOpenEdit(false)} open={openEdit}>
        <EditDialog
          handleClose={() => setOpenEdit(false)}
          initialValues={product}
        />
      </Dialog>
      <Dialog
        maxWidth={"xs"}
        onClose={() => setOpenDelete(false)}
        open={openDelete}
      >
        <ConfirmDelete
          handleClose={() => setOpenDelete(false)}
          handleDeleteCompleted={handleDelete}
        />
      </Dialog>
      <TableRow>
        <TableCell>
          <Box
            component="img"
            sx={{
              height: 30,
              width: 30,
            }}
            alt="The house from the offer."
            src={product.picture_url}
          />
        </TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>{product.model ?? ""}</TableCell>
        <TableCell>
          <NumericFormat
            displayType="text"
            defaultValue={"-"}
            value={product.price}
            thousandSeparator={" "}
          />
        </TableCell>
        <TableCell>{product.serial}</TableCell>
        <TableCell>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <IconButton onClick={() => setOpenEdit(true)}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton onClick={() => setOpenDelete(true)}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
}
