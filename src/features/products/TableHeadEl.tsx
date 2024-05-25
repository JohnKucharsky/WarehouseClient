import { Dialog, TableCell } from "@mui/material";
import { useTranslation } from "react-i18next";
import CellSort from "./CellSort";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import CreateDialog from "src/features/products/CreateDialog.tsx";

export default function TableHeadEl() {
  const { t } = useTranslation();
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <>
      <Dialog onClose={() => setCreateOpen(false)} open={createOpen}>
        <CreateDialog handleClose={() => setCreateOpen(false)} />
      </Dialog>

      <TableCell>{t("Picture")}</TableCell>
      <CellSort label={t("Name")} value="name" />
      <TableCell>{t("Model")}</TableCell>
      <TableCell>{t("Price")}</TableCell>
      <CellSort label={t("Serial")} value="serial" />
      <TableCell>
        <AddIcon onClick={() => setCreateOpen(true)} />
      </TableCell>
    </>
  );
}
