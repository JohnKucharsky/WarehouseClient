import { DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function DialogTitleEl({
  handleClose,
  title,
}: {
  handleClose?: () => void;
  title: string;
}) {
  return (
    <DialogTitle
      sx={{
        pt: 2,
        pb: 0,
        width: "100%",
      }}
    >
      {handleClose ? (
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
      ) : null}
      <Typography fontSize={"1.5rem"} gutterBottom>
        {title}
      </Typography>
    </DialogTitle>
  );
}
