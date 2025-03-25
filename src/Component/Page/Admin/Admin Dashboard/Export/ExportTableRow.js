import { Button, TableCell, TableRow } from '@mui/material';

function ExportTableRow({ exportModel, setActiveComponent }) {
  return (
    <TableRow>
      <TableCell style={{ textAlign: 'start', fontSize: '1.3rem' }}>{exportModel.id}</TableCell>
      <TableCell style={{ textAlign: 'start', fontSize: '1.3rem' }}>
        {exportModel.order?.user?.fullname}
      </TableCell>
      <TableCell style={{ textAlign: 'end', fontSize: '1.3rem' }}>
        {exportModel.dateExport.split('T')[0]}
      </TableCell>
      <TableCell style={{ textAlign: 'end', fontSize: '1.3rem' }}>
        ${exportModel.order?.total_price}
      </TableCell>
      <TableCell style={{ textAlign: 'end', fontSize: '1.3rem' }}>
        <Button
          variant="outlined"
          onClick={() =>
            setActiveComponent({ name: 'AdminViewExport', props: { id: exportModel.id } })
          }
        >
          View
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            setActiveComponent({ name: 'AdminEditExport', props: { id: exportModel.id } })
          }
        >
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default ExportTableRow;
