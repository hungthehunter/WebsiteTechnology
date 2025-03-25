import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import EmptyState from "./EmptyState";
import ImportTableRow from "./ImportTableRow";

function ImportTable({ filteredImports, setActiveComponent }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>Id</TableCell>
            <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>Manufacturer</TableCell>
            <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>Date Import</TableCell>
            <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>Total</TableCell>
            <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredImports.length > 0 ? (
            filteredImports.map((importModel) => (
              <ImportTableRow
                key={importModel.id}
                importModel={importModel}
                setActiveComponent={setActiveComponent}
              />
            ))
          ) : (
            <EmptyState message="No import found" />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ImportTable;
