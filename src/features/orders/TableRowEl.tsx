import { Dialog, IconButton, Stack, TableCell, TableRow } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import ConfirmDelete from "src/components/ConfirmDelete.tsx";
import { useUnit } from "effector-react";
import { Order } from "src/features/orders/data/types.ts";
import { deleteOrderFx } from "src/features/orders/data/api.ts";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export default function TableRowEl({ order }: { order: Order }) {
  const [openDelete, setOpenDelete] = useState(false);

  const [deleteOrder] = useUnit([deleteOrderFx]);

  const { t } = useTranslation();

  const handleDelete = () => {
    deleteOrder(order.id).finally(() => setOpenDelete(false));
  };

  return (
    <>
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
        <TableCell>{t(order.payment)}</TableCell>
        <TableCell>{dayjs(order.created_at).format("YYYY-MM-DD")}</TableCell>
        <TableCell>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <IconButton onClick={() => setOpenDelete(true)}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
}
