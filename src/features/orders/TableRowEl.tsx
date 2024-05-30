import { Dialog, IconButton, Stack, TableCell, TableRow } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import ConfirmDelete from "src/components/ConfirmDelete.tsx";
import EditDialog from "src/features/orders/EditDialog.tsx";
import { useUnit } from "effector-react";
import { Order } from "src/features/orders/data/types.ts";
import { deleteOrderFx } from "src/features/orders/data/api.ts";
import dayjs from "dayjs";

export default function TableRowEl({ order }: { order: Order }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [deleteOrder] = useUnit([deleteOrderFx]);

  const handleDelete = () => {
    deleteOrder(order.id).finally(() => setOpenDelete(false));
  };

  return (
    <>
      <Dialog onClose={() => setOpenEdit(false)} open={openEdit}>
        <EditDialog
          handleClose={() => setOpenEdit(false)}
          initialValues={order}
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
        <TableCell>{order.id}</TableCell>
        <TableCell>{order.payment}</TableCell>
        <TableCell>{dayjs(order.created_at).format("YYYY-MM-DD")}</TableCell>
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
