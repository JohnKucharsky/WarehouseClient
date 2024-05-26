import { Dialog, IconButton, TableCell } from "@mui/material";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import CreateDialog from "src/features/addresses/CreateDialog.tsx";

export default function TableHeadEl() {
  const { t } = useTranslation();
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <>
      <Dialog onClose={() => setCreateOpen(false)} open={createOpen}>
        <CreateDialog handleClose={() => setCreateOpen(false)} />
      </Dialog>

      <TableCell>{t("City")}</TableCell>
      <TableCell>{t("Street")}</TableCell>
      <TableCell>{t("House")}</TableCell>
      <TableCell>{t("Floor")}</TableCell>
      <TableCell>{t("Entrance")}</TableCell>
      <TableCell>{t("additionalInfo")}</TableCell>
      <TableCell>
        <IconButton onClick={() => setCreateOpen(true)}>
          <AddIcon />
        </IconButton>
      </TableCell>
    </>
  );
}
