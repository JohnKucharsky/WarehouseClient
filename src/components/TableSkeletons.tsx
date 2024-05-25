import { Skeleton, TableCell, TableRow } from "@mui/material";

export default function TableSkeletons({
  skeletonRowsCount,
  cellsCount,
}: {
  skeletonRowsCount: number;
  cellsCount: number;
}) {
  return Array(skeletonRowsCount)
    .fill(null)
    .map((_, index) => {
      return (
        <TableRow key={index}>
          {Array(cellsCount)
            .fill(null)
            .map((_, idx) => (
              <TableCell key={idx}>
                <Skeleton width={"100%"} height={"2rem"} animation={"wave"} />
              </TableCell>
            ))}
        </TableRow>
      );
    });
}
