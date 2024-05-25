import { Button, DialogActions, FormHelperText } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";

export default function DialogActionsEl({
  submit,
  edit,
}: {
  submit: string | null | undefined;
  edit?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <DialogActions
      sx={{
        pt: 0.5,
        pb: 2,
        px: 2,
        justifyContent: "flex-start",
      }}
    >
      {submit ? (
        <FormHelperText error>{JSON.stringify(submit)}</FormHelperText>
      ) : null}
      <Button
        type="submit"
        startIcon={edit ? <SaveIcon /> : <AddIcon />}
        disabled={Boolean(submit)}
        variant="contained"
      >
        {edit ? t("Save") : t("Create")}
      </Button>
    </DialogActions>
  );
}
