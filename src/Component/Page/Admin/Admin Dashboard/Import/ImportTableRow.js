import { Button, TableCell, TableRow } from "@mui/material";

function ImportTableRow({ importModel, setActiveComponent }) {
  return (
    <TableRow>
      <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>{importModel.id}</TableCell>
      <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
        {importModel.manufacturer.name}
      </TableCell>
      <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
        {importModel.dateImport.split("T")[0]}
      </TableCell>
      <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
        ${importModel.total}
      </TableCell>
      <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
        <Button
          variant="outlined"
          onClick={() =>
            setActiveComponent({ name: "AdminViewImport", props: { id: importModel.id } })
          }
        >
          View
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            setActiveComponent({ name: "AdminEditImport", props: { id: importModel.id } })
          }
        >
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default ImportTableRow;
