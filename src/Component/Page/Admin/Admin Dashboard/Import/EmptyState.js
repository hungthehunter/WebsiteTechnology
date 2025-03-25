import { TableCell, TableRow } from "@mui/material";

function EmptyState({ message }) {
  return (
    <TableRow>
      <TableCell colSpan={5} style={{ textAlign: "center", paddingTop: 100, fontSize: "1.3rem" }}>
        {message}
      </TableCell>
    </TableRow>
  );
}

export default EmptyState;
