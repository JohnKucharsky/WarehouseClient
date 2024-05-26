import { Button, DialogActions, FormHelperText } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export default function DialogActionsEl({
  submit,
  title,
  saveIcon,
}: {
  submit: string | null | undefined;
  title: string;
  saveIcon?: boolean;
}) {
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
        startIcon={saveIcon ? <SaveIcon /> : null}
        disabled={Boolean(submit)}
        variant="contained"
      >
        {title}
      </Button>
    </DialogActions>
  );
}
