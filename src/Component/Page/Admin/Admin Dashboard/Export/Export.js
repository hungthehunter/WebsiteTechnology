import { Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import ExportTable from './ExportTable';

function AdminExport({ setActiveComponent }) {
  const exportList = useSelector((state) => state.export.listExport);

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          width: '100%',
          height: '80vh',
          overflowY: 'auto',
          boxShadow: 3,
          borderRadius: 2,
          padding: 3,
          backgroundColor: 'white',
          margin: '0 auto',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: '2.5rem' }}>
            Recent Export
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setActiveComponent({ name: 'AdminAddExport' })}
          >
            + Add New Export
          </Button>
        </Box>
        <ExportTable exportList={exportList} setActiveComponent={setActiveComponent} />
      </Box>
    </Box>
  );
}

export default AdminExport;
