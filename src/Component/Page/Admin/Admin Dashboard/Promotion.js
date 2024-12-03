import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { promotionThunk } from '../../../../services/redux/thunks/thunk';
const AdminPromotion = ({setActiveComponent,showAlert}) => {
const dispatch = useDispatch();
const listPromotion = useSelector((state) => state.promotion.listPromotion);

  // DELETE: Delete User by id from Database
  const handleDelete = async (id) => {
        try {
          dispatch(promotionThunk.deletePromotion(id));
          dispatch(promotionThunk.getAllPromotions());
          showAlert("Delete category successfully", "success");
          
        } catch (error) {
          showAlert("Failed to delete category successfully", "error");
          console.error("Error deleting category:", error);
        }
      }
    

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
            Promotion Management
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setActiveComponent({ name: "AdminAddPromotion" })}>
            + Add New Promotion
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "start" , fontSize: '1.5rem'}}>Id</TableCell>
                <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Name</TableCell>
                <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Discount (%)</TableCell>
                <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Active</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: '1.5rem' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listPromotion.map((promotion, index) => (
                <TableRow key={index}>
                  <TableCell style={{ textAlign: "start", fontSize: '1.3rem' }}>{promotion.id}</TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: '1.3rem' }}>{promotion.name}</TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: '1.3rem' }}>{promotion.discountPercentage}</TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: '1.3rem' }}>
                    {promotion.isActive ? "Yes" : "No"}
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: '1.3rem' }}>
                    <Button 
                      variant="outlined" 
                      onClick={() => setActiveComponent({ name: "AdminViewPromotion", props: { id: promotion.id } })}
                    >
                      View
                    </Button>
                    <Button 
                      variant="outlined" 
                      onClick={() => setActiveComponent({ name: "AdminEditPromotion", props: { id: promotion.id } })}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      onClick={() => handleDelete(promotion.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {listPromotion.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: "center", paddingTop: 100 }}>
                    No promotions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminPromotion;
