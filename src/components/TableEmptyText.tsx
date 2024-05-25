import { TableBody, TableCell, TableRow, Typography } from "@mui/material";

export default function TableEmptyText({
  colSpan,
  title,
}: {
  colSpan: number;
  title: string;
}) {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={colSpan}>
          <Typography
            sx={{
              py: 10,
            }}
            variant="h3"
            fontWeight="normal"
            color="secondary"
            align="center"
          >
            {title}
          </Typography>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
