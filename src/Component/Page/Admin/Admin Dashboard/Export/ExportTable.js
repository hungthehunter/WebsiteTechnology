import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EmptyState from './EmptyState';
import ExportTableRow from './ExportTableRow';

function ExportTable({ exportList, setActiveComponent }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ textAlign: 'start', fontSize: '1.5rem' }}>Id</TableCell>
            <TableCell style={{ textAlign: 'start', fontSize: '1.5rem' }}>Customer</TableCell>
            <TableCell style={{ textAlign: 'end', fontSize: '1.5rem' }}>Date Export</TableCell>
            <TableCell style={{ textAlign: 'end', fontSize: '1.5rem' }}>Total</TableCell>
            <TableCell style={{ textAlign: 'end', fontSize: '1.5rem' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exportList.length > 0 ? (
            exportList.map((exportModel) => (
              <ExportTableRow
                key={exportModel.id}
                exportModel={exportModel}
                setActiveComponent={setActiveComponent}
              />
            ))
          ) : (
            <EmptyState message="No export found" />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExportTable;
