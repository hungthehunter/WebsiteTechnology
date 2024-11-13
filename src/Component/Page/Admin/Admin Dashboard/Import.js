import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import "./assets/css/style.scss";

function AdminImport({setActiveComponent, showAlert}){
    const importList = useSelector((state) => state.import.listImport);
  
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
              Recent Import
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setActiveComponent({ name: "AdminAddImport" })}>
              + Add New Import
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: "start",fontSize: '1.5rem' }}>Id</TableCell>
                  <TableCell style={{ textAlign: "start",fontSize: '1.5rem' }}>Manufacturer</TableCell>
                  <TableCell style={{ textAlign: "end",fontSize: '1.5rem' }}>Date Import</TableCell>
                  <TableCell style={{ textAlign: "end",fontSize: '1.5rem' }}>Total</TableCell>
                  <TableCell style={{ textAlign: "end",fontSize: '1.5rem' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {importList.map((importModel) => (
                  <TableRow key={importModel.id}>
                    <TableCell style={{ textAlign: "start",fontSize: '1.3rem' }}>{importModel.id}</TableCell>
                    <TableCell style={{ textAlign: "start",fontSize: '1.3rem' }}>{importModel.manufacturer.name}</TableCell>
                    <TableCell style={{ textAlign: "end",fontSize: '1.3rem' }}>{importModel.dateImport.split('T')[0]}</TableCell>
                    <TableCell style={{ textAlign: "end",fontSize: '1.3rem' }}>${importModel.total}</TableCell>
                    <TableCell style={{ textAlign: "end" ,fontSize: '1.3rem'}}>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          setActiveComponent({
                            name: "AdminViewImport",
                            props: { id: importModel.id },
                          })
                        }
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          setActiveComponent({
                            name: "AdminEditImport",
                            props: { id: importModel.id },
                          })
                        }
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {importList.length === 0 && (
                  // bruh
                <TableRow className="nouser">
                  <TableCell colSpan={6} className="inform" style={{ textAlign: "center", paddingTop: 100 }}>
                    No import found
                  </TableCell>
                </TableRow>
              )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    )
}
export default AdminImport;