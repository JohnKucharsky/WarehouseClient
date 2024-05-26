import { Dialog, IconButton, Stack, TableCell, TableRow } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import ConfirmDelete from "src/components/ConfirmDelete.tsx";
import EditDialog from "src/features/addresses/EditDialog.tsx";
import { useUnit } from "effector-react";
import { Address } from "src/features/addresses/data/types.ts";
import { deleteAddressFx } from "src/features/addresses/data/api.ts";

export default function TableRowEl({ address }: { address: Address }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [deleteAddress] = useUnit([deleteAddressFx]);

  const handleDelete = () => {
    deleteAddress(address.id).finally(() => setOpenDelete(false));
  };

  return (
    <>
      <Dialog onClose={() => setOpenEdit(false)} open={openEdit}>
        <EditDialog
          handleClose={() => setOpenEdit(false)}
          initialValues={address}
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
        <TableCell>{address.city}</TableCell>
        <TableCell>{address.street}</TableCell>
        <TableCell>{address.house}</TableCell>
        <TableCell>{address.floor ?? ""}</TableCell>
        <TableCell>{address.entrance ?? ""}</TableCell>
        <TableCell>{address.additional_info ?? ""}</TableCell>
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
