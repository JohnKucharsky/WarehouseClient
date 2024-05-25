import { DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function DialogTitleEl({
  handleClose,
  title,
}: {
  handleClose: () => void;
  title: string;
}) {
  return (
    <DialogTitle
      sx={{
        p: 3,
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
        }}
        onClick={handleClose}
        size="small"
        color={"primary"}
      >
        <CloseIcon />
      </IconButton>
      <Typography fontSize={"1.5rem"} gutterBottom>
        {title}
      </Typography>
    </DialogTitle>
  );
}
