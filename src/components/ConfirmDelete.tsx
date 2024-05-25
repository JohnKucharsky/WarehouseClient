import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ConfirmDelete({
  handleClose,
  handleDeleteCompleted,
}: {
  handleClose: () => void;
  handleDeleteCompleted: () => void;
}) {
  const { t } = useTranslation();

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        position={"relative"}
        p={2}
      >
        <Box position={"absolute"} top={2} right={2}>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography
          sx={{
            mb: 3,
            pr: 5,
          }}
          variant="h5"
        >
          {t("deleteWarning")}
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          sx={{ mb: 1 }}
          onClick={handleClose}
        >
          {t("Cancel")}
        </Button>
        <Button
          color={"error"}
          onClick={handleDeleteCompleted}
          fullWidth
          variant="contained"
        >
          {t("Delete")}
        </Button>
      </Box>
    </>
  );
}
