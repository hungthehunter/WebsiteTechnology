import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import "./assets/css/style.scss";

function AdminExport({setActiveComponent, showAlert}){
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
            <Button variant="contained" color="primary" onClick={() => setActiveComponent({ name: "AdminAddExport" })}>
              + Add New Export
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: "start",fontSize: '1.5rem' }}>Id</TableCell>
                  <TableCell style={{ textAlign: "start",fontSize: '1.5rem' }}>Customer</TableCell>
                  <TableCell style={{ textAlign: "end",fontSize: '1.5rem' }}>Date Export</TableCell>
                  <TableCell style={{ textAlign: "end",fontSize: '1.5rem' }}>Total</TableCell>
                  <TableCell style={{ textAlign: "end",fontSize: '1.5rem' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exportList.map((exportModel) => (
                  <TableRow key={exportModel.id}>
                    <TableCell style={{ textAlign: "start",fontSize: '1.3rem' }}>{exportModel.id}</TableCell>
                    <TableCell style={{ textAlign: "start",fontSize: '1.3rem' }}>{exportModel.order?.user?.fullname}</TableCell>
                    <TableCell style={{ textAlign: "end",fontSize: '1.3rem' }}>{exportModel.dateExport.split('T')[0]}</TableCell>
                    <TableCell style={{ textAlign: "end",fontSize: '1.3rem' }}>${exportModel.order?.total_price}</TableCell>
                    <TableCell style={{ textAlign: "end" ,fontSize: '1.3rem'}}>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          setActiveComponent({
                            name: "AdminViewExport",
                            props: { id: exportModel.id },
                          })
                        }
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          setActiveComponent({
                            name: "AdminEditExport",
                            props: { id: exportModel.id },
                          })
                        }
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {exportList.length === 0 && (
                  // bruh
                <TableRow className="nouser">
                  <TableCell colSpan={6} className="inform" style={{ textAlign: "center", paddingTop: 100 }}>
                    No export found
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
export default AdminExport;